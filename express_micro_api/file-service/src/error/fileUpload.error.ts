export class FileUploadError extends Error {
  constructor(
    public status: number,
    public message: string,
    public fileName: string
  ) {
    super(message);
  }
}
