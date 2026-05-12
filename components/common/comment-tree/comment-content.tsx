type Props = {
  content: string;
};

export function CommentContent({ content }: Props) {
  return (
    <p className="font-lora mt-1.5 text-[14px] leading-relaxed whitespace-pre-wrap sm:text-[15px]">
      {content}
    </p>
  );
}
