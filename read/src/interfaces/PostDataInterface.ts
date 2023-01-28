interface DataInterface {
  title: string;
  content: string;
  timestamp: Date;
  author: {
    user_name: string;
    given_name: string;
    family_name: string;
    password: string;
    admin: boolean;
  };
  published: boolean;
  _id: string;
}

export default DataInterface;
