import Markdown from 'react-markdown'


const TextMarkdown = ({
    text,
}: {
    text: string;
}) => {
  return (
   <Markdown>{text}</Markdown>
  )
}

export default TextMarkdown
