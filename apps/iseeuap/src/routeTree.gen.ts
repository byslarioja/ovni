/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as EulaImport } from './routes/eula'
import { Route as DeleteAccountImport } from './routes/delete-account'
import { Route as IndexImport } from './routes/index'
import { Route as DeleteAccounttokenImport } from './routes/delete-account.[token]'

// Create/Update Routes

const EulaRoute = EulaImport.update({
  path: '/eula',
  getParentRoute: () => rootRoute,
} as any)

const DeleteAccountRoute = DeleteAccountImport.update({
  path: '/delete-account',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const DeleteAccounttokenRoute = DeleteAccounttokenImport.update({
  path: '/[token]',
  getParentRoute: () => DeleteAccountRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/delete-account': {
      id: '/delete-account'
      path: '/delete-account'
      fullPath: '/delete-account'
      preLoaderRoute: typeof DeleteAccountImport
      parentRoute: typeof rootRoute
    }
    '/eula': {
      id: '/eula'
      path: '/eula'
      fullPath: '/eula'
      preLoaderRoute: typeof EulaImport
      parentRoute: typeof rootRoute
    }
    '/delete-account/[token]': {
      id: '/delete-account/[token]'
      path: '/[token]'
      fullPath: '/delete-account/[token]'
      preLoaderRoute: typeof DeleteAccounttokenImport
      parentRoute: typeof DeleteAccountImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  DeleteAccountRoute: DeleteAccountRoute.addChildren({
    DeleteAccounttokenRoute,
  }),
  EulaRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/delete-account",
        "/eula"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/delete-account": {
      "filePath": "delete-account.tsx",
      "children": [
        "/delete-account/[token]"
      ]
    },
    "/eula": {
      "filePath": "eula.tsx"
    },
    "/delete-account/[token]": {
      "filePath": "delete-account.[token].tsx",
      "parent": "/delete-account"
    }
  }
}
ROUTE_MANIFEST_END */
