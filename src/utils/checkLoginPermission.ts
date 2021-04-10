import { Permission } from 'enums/security'

const checkLoginPermission = (
  sigsCanView: (string | null)[],
  sigsCanEdit: (string | null)[],
  sigSlug: string
): Permission[] => {
  const permissions: Permission[] = []

  if (sigsCanEdit.includes(sigSlug)) permissions.push(Permission.EDIT)

  if (sigsCanView.includes(sigSlug)) permissions.push(Permission.VIEW)

  return permissions
}

export { checkLoginPermission }
