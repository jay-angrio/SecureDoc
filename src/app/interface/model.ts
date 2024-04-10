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
  lock_type: string;
}

export interface filesData {
  id: any;
  userId: string;
  pdfSrc: string;
  lock: string;
  lock_type: string;
}
