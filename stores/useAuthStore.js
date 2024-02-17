const { create } = require("zustand");

const useStore = create((set) => ({
  userStatus: undefined,
  setUserStatus: (userStatus) => set({ userStatus }),
  isOrgAdmin: undefined,
  setIsOrgAdmin: (isOrgAdmin) => set({ isOrgAdmin }),
  isMemberOfOrg: undefined,
  setIsMemberOfOrg: (isMemberOfOrg) => set({ isMemberOfOrg }),

  orgDetails: {},
  setOrgDetails: (orgDetails) => set({ orgDetails }),
}));

export default useStore;
