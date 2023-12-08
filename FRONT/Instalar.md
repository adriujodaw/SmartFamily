1. Instalar estas dependencias:

npm install next-auth @uiball/loaders swiper

2. Crear un archivo .env con eate contenido:

NEXT_PUBLIC_BACKEND_URL=http://localhost:4000/api
NEXTAUTH_SECRET=no.utilizar.en.producción

3. Crear un archivo gitignore con el siguiente contenido:

# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts