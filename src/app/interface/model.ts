export interface userDetails {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface document {
  userId: string;
  pdfSrc: any;
  lock: string;
}
