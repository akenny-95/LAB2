export default function SetDisplay() {
    const styles = `
        body {
            margin-top: 30px;
            text-align:center;
            background-color: mistyrose;
        }
        #createTodo {
            display: none;
        }
        .checkboxes {
            margin-right: 10px
        }
        .delete_buttons {
            margin-left: 10px
        }
        `;
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    return;
};