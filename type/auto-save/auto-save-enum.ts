enum AutoSaveType {
  UPDATE_CHAPTER = 'update_chapter',
  NEW_CHAPTER = 'new_chapter',
  ROOT_CHAPTER = 'root_chapter',
}

const AUTO_SAVE_TYPES = ['update_chapter', 'new_chapter', 'root_chapter'] as const;

enum ConvertedChapterStatus {
  PENDING_APPROVAL = 'pending_approval',
  PUBLISHED = 'published',
}

const CONVERTED_CHAPTER_STATUSES = ['pending_approval', 'published'] as const;

export { AutoSaveType, AUTO_SAVE_TYPES, ConvertedChapterStatus, CONVERTED_CHAPTER_STATUSES };
