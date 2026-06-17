type Props = {
  content: string;
};

export function CommentContent({ content }: Props) {
  return (
    <p className="ct-comment-body font-lora mt-2 text-[14px] leading-[1.7] whitespace-pre-wrap sm:text-[15px]">
      {content}
    </p>
  );
}
