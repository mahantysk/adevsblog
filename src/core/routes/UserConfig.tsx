const UserRoles = {
  Viewer: "Anyone having this role can view the selected resource.",
  Admin: "Anyone having this role can add/edit/update the selected resource.",
};

type User = {
  id: string;
  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  role: string;
};

export type { User };
export default UserRoles;
