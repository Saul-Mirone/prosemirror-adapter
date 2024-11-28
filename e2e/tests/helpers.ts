import { test } from '@playwright/test'

const FRAMEWORKS = ['lit', 'react', 'solid', 'svelte', 'vue']

export function testAll(fn: VoidFunction) {
  for (const framework of FRAMEWORKS) {
    test.describe(framework, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(`/${framework}/`, { waitUntil: 'domcontentloaded' })
      })
      fn()
    })
  }
}
