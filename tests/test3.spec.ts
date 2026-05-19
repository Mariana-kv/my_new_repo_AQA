import { test, expect} from '@playwright/test';

interface Product {
  id: string;
  name: string;
  price: number;
  [key: string]: unknown;
}

interface ProductsResponse {
  data: Product[];
  current_page: number;
  per_page: number;
  total: number;
  [key: string]: unknown;
}

test('Verify mocked data',  { tag: '@smoke' }, async ( {page}) => {
  await test.step('Setup mock and open homepage', async () => {
    await page.route('https://api.practicesoftwaretesting.com/products**', async route => {
    const response = await route.fetch();
    const json = await response.json() as ProductsResponse;
    const mockedData = {
        ...json,
        data: Array(20).fill(json.data[0]),
        per_page: 20,
        total: 20,
    }
    await route.fulfill({ json: mockedData });
  });
  await page.goto('/');
});

await test.step('Verify 20 products are displayed', async () => {
  await expect(page.getByTestId('product-name')).toHaveCount(20);
});
});