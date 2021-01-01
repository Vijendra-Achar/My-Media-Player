export interface GetVideo {
  id: string;
  data: {
    name: string;
    uploadedBy: string;
    uri: string;
    subTitle: string;
  };
}
