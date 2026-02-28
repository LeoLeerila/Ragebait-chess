function ChatTxt({chat}){

    return(
        <div>
            {chat.isbot ? <div className="message opponent"><div className="bubble"><p>{chat.ctxt}</p></div></div>:<div className="message user"><div className="bubble" ><p>{chat.ctxt}</p></div></div>}
        </div>
    );
};

export default ChatTxt;
/*
<div className="message opponent"><div className="bubble"><p>This is my evil reign!</p></div></div>

<div className="message user"><div className="bubble" ><p>Bro chill out.</p></div></div>*/