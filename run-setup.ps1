Write-Host "Updating database schema..."
npx prisma db push --accept-data-loss
Write-Host "Generating prisma client..."
npx prisma generate
Write-Host "Seeding data..."
npx prisma db seed
Write-Host "Starting dev server..."
npm run dev
