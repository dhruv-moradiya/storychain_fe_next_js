type Props = {
  content: string;
};

export function CommentContent({ content }: Props) {
  return (
    <p className="ct-comment-body font-lora mt-1 text-[13px] leading-relaxed whitespace-pre-wrap sm:mt-2 sm:text-[15px] sm:leading-[1.7]">
      {content}
    </p>
  );
}
