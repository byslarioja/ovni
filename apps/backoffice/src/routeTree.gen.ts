/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as VideosImport } from './routes/videos'
import { Route as UsersIndexImport } from './routes/users/index'
import { Route as UsersUserIdImport } from './routes/users/$userId'

// Create/Update Routes

const VideosRoute = VideosImport.update({
  path: '/videos',
  getParentRoute: () => rootRoute,
} as any)

const UsersIndexRoute = UsersIndexImport.update({
  path: '/users/',
  getParentRoute: () => rootRoute,
} as any)

const UsersUserIdRoute = UsersUserIdImport.update({
  path: '/users/$userId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/videos': {
      preLoaderRoute: typeof VideosImport
      parentRoute: typeof rootRoute
    }
    '/users/$userId': {
      preLoaderRoute: typeof UsersUserIdImport
      parentRoute: typeof rootRoute
    }
    '/users/': {
      preLoaderRoute: typeof UsersIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  VideosRoute,
  UsersUserIdRoute,
  UsersIndexRoute,
])

/* prettier-ignore-end */
