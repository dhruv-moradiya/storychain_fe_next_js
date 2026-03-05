enum SubmitRequestType {
  NEW_CHAPTER = 'new_chapter',
  EDIT_CHAPTER = 'edit_chapter',
  DELETE_CHAPTER = 'delete_chapter',
}

const SUBMIT_REQUEST_TYPE = ['new_chapter', 'edit_chapter', 'delete_chapter'] as const;

export { SubmitRequestType, SUBMIT_REQUEST_TYPE };
