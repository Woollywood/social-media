import {
  type OnGatewayConnection,
  type OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { type Server, type Socket } from 'socket.io';

import { AuthService } from '../auth/auth.service';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly userSockets = new Map<string, Set<string>>();

  constructor(private readonly authService: AuthService) {}

  async handleConnection(client: Socket) {
    const token = this.extractToken(client);
    if (!token) {
      client.disconnect();
      return;
    }

    try {
      const user = await this.authService.validateAccessToken(token);
      client.data.userId = user.id;
      client.join(this.userRoom(user.id));
      this.addSocket(user.id, client.id);
    } catch {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.data?.userId as string | undefined;
    if (!userId) return;

    this.removeSocket(userId, client.id);
  }

  emitToUser(userId: string, event: string, payload: unknown) {
    this.server.to(this.userRoom(userId)).emit(event, payload);
  }

  private extractToken(client: Socket) {
    const authToken = client.handshake.auth?.token;
    if (typeof authToken === 'string' && authToken.length > 0) {
      return authToken;
    }

    const header = client.handshake.headers?.authorization;

    if (typeof header !== 'string') return null;

    const [scheme, token] = header.split(' ');
    if (scheme !== 'Bearer' || !token) return null;

    return token;
  }

  private userRoom(userId: string) {
    return `user:${userId}`;
  }

  private addSocket(userId: string, socketId: string) {
    const existing = this.userSockets.get(userId);
    if (existing) {
      existing.add(socketId);
      return;
    }

    this.userSockets.set(userId, new Set([socketId]));
  }

  private removeSocket(userId: string, socketId: string) {
    const existing = this.userSockets.get(userId);
    if (!existing) return;

    existing.delete(socketId);
    if (existing.size === 0) {
      this.userSockets.delete(userId);
    }
  }
}
