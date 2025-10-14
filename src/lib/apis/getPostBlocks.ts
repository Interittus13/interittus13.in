import { NotionAPI } from "notion-client";

export const getPostBlocks = async (id: string) => {
  const api = new NotionAPI(
    // apiBaseUrl: "https://meadow-skink-aaf.notion.site/api/v3",
    // authToken: 'v03:eyJhbGciOiJkaXIiLCJraWQiOiJwcm9kdWN0aW9uOnRva2VuLXYzOjIwMjQtMTEtMDciLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIn0..7_stUfRP-MZttRNqUnGgxQ.bL0lbEaiBafC-RNiprNtfucQrsoUaeTuw50P7S2yCjUlgc-iJTMIrdAZXxaNs7TKnBc4ZN2-6LcrQwR2Q74-TnSaw2mhhy1URqpxjnv2VmEm5hjAmyojCXY50MV0YXkIAkttWS1tz1QYvOp0lHGGUTAm5grAlGaYlNwFYLc5L-GLNoURQplMECS31ysDvJ7cSVqQ3oG-J3K3szMLZpgWMq3j45ZjJXut1yH4TzyB2tkErVHFDl9mSYRevJuXW8-sQWaagRsuSfSmt42OojDjUunAZpmolAaleIuCMdHLXp-6-jjWzM8CCGzwCgOja0EyRJg77ltOjHqHje5ttuH_XN_loRHO9UpntfUCSPkJeQg.aQ9xuYoDwthnTrgZTNy2UQhUxZcFzF2RuOJ_Gryy1d8',
    // activeUser: '50f71cdc-1e0d-45bb-9ae3-216eeefefed4',
    // ofetchOptions: {
    //   onRequest({ request, options }) {
    //     const reqPath = new URL(request.toString()).pathname;

    //     if (reqPath.includes("/api/v3/queryCollection")) {
    //       options.headers.set("x-notion-space-id", "x");
    //     }
    //   },
    // },
  );
  const recordMap = await api.getPage(id);
  return recordMap;
};
