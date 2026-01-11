type CreateLibrary = {
  name: string;
  address: string;
};

type UpdateLibrary = {
  name?: string;
  address?: string;
};

type RequestBody = CreateLibrary | UpdateLibrary;

export default RequestBody;
