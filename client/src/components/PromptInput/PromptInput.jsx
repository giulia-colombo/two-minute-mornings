import { useState } from "react";

const PromptInput = () => {
    const [focusPrompt, setFocusPrompt] = useState("");
    const [gratefulPrompt, setGratefulPrompt] = useState("");
    const [letGoPrompt, setLetGoPrompt] = useState("");

    const handleFocusPrompt = e => setFocusPrompt(e.target.value)
    const handleGratefulPrompt = e => setGratefulPrompt(e.target.value)
    const handleLetGoPrompt = e => setLetGoPrompt(e.target.value)

    const handleSubmit = e => {
        e.preventDefault();
        const newEntry = {
            focusPrompt,
            gratefulPrompt,
            letGoPrompt
        }
        console.log("Saved entry:", newEntry)

        //reset the state
        setFocusPrompt("");
        setGratefulPrompt("");
        setLetGoPrompt("");
    }

    return (
        <div className="PromptInput">
            <form onSubmit={handleSubmit}>
            <label>Today I will focus on...</label>
                <textarea 
                    type="text"
                    name="focusPrompt"
                    value={focusPrompt} //the value attribute connects the input to the state
                    onChange={handleFocusPrompt}
                />

                <label>Today I am grateful for...</label>
                <textarea 
                    type="text"
                    name="gratefulPrompt"
                    value={gratefulPrompt} //the value attribute connects the input to the state
                    onChange={handleGratefulPrompt}
                />

                <label>Today I will let go of...</label>
                <textarea 
                    type="text"
                    name="letGoPrompt"
                    value={letGoPrompt} //the value attribute connects the input to the state
                    onChange={handleLetGoPrompt}
                />
                <button type="submit">Save your entry</button>
            </form>
        </div>
    );
}
 
export default PromptInput;