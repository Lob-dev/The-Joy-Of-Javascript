import { useRef } from "react";

const MessageInput = ({ mutate, text = '', id = undefined }) => {
  const textRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const text = textRef.current.value;
    textRef.current.value = "";
    mutate(id, text);
  };

  return (
    <form className="messages__input" onSubmit={onSubmit}>
      <textarea ref={textRef} defaultValue={text} placeholder="내용을 입력하세요."></textarea>
      <button type="submit">완료</button>
    </form>
  );
};

export default MessageInput;
