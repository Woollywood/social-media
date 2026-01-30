import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Chat')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
  });
};

export type PaginationParams = {
  page?: number | string;
  limit?: number | string;
};

export type PaginationResult = {
  page: number;
  limit: number;
  skip: number;
  take: number;
};

export type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  pages: number;
};

const MIN_PAGE = 0;
const DEFAULT_PAGE = MIN_PAGE;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

const toNonNegativeInt = (
  value: number | string | undefined,
  fallback: number,
) => {
  if (value === undefined || value === null) {
    return fallback;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  const intValue = Math.floor(parsed);
  return intValue >= 0 ? intValue : fallback;
};

export const normalizePagination = (
  params: PaginationParams,
): PaginationResult => {
  const page = toNonNegativeInt(params.page, DEFAULT_PAGE);
  const limit = Math.min(
    Math.max(toNonNegativeInt(params.limit, DEFAULT_LIMIT), 1),
    MAX_LIMIT,
  );
  const skip = page * limit;

  return { page, limit, skip, take: limit };
};

export const buildPaginationMeta = (
  total: number,
  page: number,
  limit: number,
): PaginationMeta => ({
  total,
  page,
  limit,
  pages: Math.ceil(total / limit),
});
