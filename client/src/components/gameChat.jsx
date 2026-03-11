function ChatTxt({chat}){
    return(
        <div>
            {chat.isLLMAnswer ? <div className="message opponent"><div className="bubble"><p>{chat.answer}</p></div></div>:<div className="message user"><div className="bubble" ><p>{chat.answer}</p></div></div>}
        </div>
    );
};

export default ChatTxt;
/*
<div className="message opponent"><div className="bubble"><p>This is my evil reign!</p></div></div>

<div className="message user"><div className="bubble" ><p>Bro chill out.</p></div></div>*/