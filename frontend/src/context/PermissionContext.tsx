import { findKey, forEach } from 'lodash';
import React, { createContext, PropsWithChildren, useContext } from 'react';

// import { PermissionRoles } from '../ts/enums/permissionRoles';

// export type TPermissionContext = Record<UPermissionKey, boolean>;

// const PermissionContext = createContext({} as TPermissionContext);
const PermissionContext = createContext({} as any);

// export const initPermissions: TPermissionContext = {
export const initPermissions: any = {
  SUPER_ADMIN: false,
  ADMIN: false,
  MODERATOR: false,
  CLIENT: false,
};

export const PermissionContextProvider = ({ children }: PropsWithChildren) => {
  const permissions = { ...initPermissions };
  // const userPermissions = (user?.permissions || []) as UPermissionId[];
  //
  // forEach(userPermissions, (item) => {
  //   const permissionKey = findKey(
  //     PermissionRoles,
  //     (permission) => item === permission
  //   ) as UPermissionKey;
  //
  //   if (permissionKey) {
  //     permissions[permissionKey] = true;
  //   }
  // });

  return (
    <PermissionContext.Provider value={permissions}>
      {children}
    </PermissionContext.Provider>
  );
};

export const useUserPermissions = () => {
  const context = useContext(PermissionContext);
  const isContextEmpty = Object.keys(context).length === 0;

  if (context === undefined || isContextEmpty) {
    throw new Error(
      'PermissionContext must be used within a PermissionContext provider'
    );
  }
  return context;
};
