import { deleteAsync } from 'del'

export function removeOldFilePlugin() {
  return {
    name: 'remove-old-file-plugin',
    async generateBundle() {
      await deleteAsync(['git-commit-extension/assets'])
    },
  }
}
