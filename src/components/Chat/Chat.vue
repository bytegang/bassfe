<template>
    <v-container>

        <h2 v-text="chatBoxTitle"></h2>
        <div class="chat-container" ref="chatContainer" v-on:scroll="onScroll">
            <message :messages="messages" @imageLoad="scrollToEnd"></message>
        </div>
        <emoji-picker :show="emojiPanel" @click="addEmojiToMessage" @close="toggleEmojiPanel"></emoji-picker>
        <div class="typer">
            <input placeholder="Type here..." type="text" v-model="content" v-on:keyup.enter="sendMessage">
            <v-btn @click="toggleEmojiPanel" class="blue--text emoji-panel" icon>
                <v-icon>mdi-emoticon-outline</v-icon>
            </v-btn>
        </div>
    </v-container>
</template>

<script>
    import Message from './PartMessage.vue'
    import EmojiPicker from './PartEmojiPicker.vue'

    export default {
        data() {
            return {
                content: '',
                chatMessages: [],
                emojiPanel: false,
                currentRef: {},
                loading: false,
                totalChatHeight: 0
            }
        },
        props: [
            'id'
        ],
        mounted() {
            this.loadChat()
            this.fireWebsocket()
        },
        components: {
            'message': Message,
            'emoji-picker': EmojiPicker,
        },
        computed: {
            chatBoxTitle(){
              return this.$store.getters.chatBoxTitle
            },
            messages() {
                return this.chatMessages
            },
            username() {
                return this.$store.getters.user.username
            },
            onNewMessageAdded() {
                const that = this
                let onNewMessageAdded = function (snapshot, newMessage = true) {
                    let message = snapshot.val()
                    message.key = snapshot.key
                    /*eslint-disable */
                    var urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig
                    /*eslint-enable */
                    message.content = message.content
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/"/g, '&quot;')
                        .replace(/'/g, '&#039;')
                    message.content = message.content.replace(urlPattern, "<a href='$1'>$1</a>")
                    if (!newMessage) {
                        that.chatMessages.unshift(that.processMessage(message))
                        that.scrollTo()
                    } else {
                        that.chatMessages.push(that.processMessage(message))
                        that.scrollToEnd()
                    }
                }
                return onNewMessageAdded
            }
        },
        watch: {},
        methods: {
            fireWebsocket(){
                let socket = new WebSocket("ws://localhost:9999/ws","ws");
                socket.onopen = function(e) {
                    console.log(e)
                    alert("[open] Connection established");
                    alert("Sending to server");
                    socket.send("My name is John");
                };

                socket.onmessage = function(event) {
                    alert(`[message] Data received from server: ${event.data}`);
                };

                socket.onclose = function(event) {
                    if (event.wasClean) {
                        alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
                    } else {
                        // e.g. server process killed or network down
                        // event.code is usually 1006 in this case
                        alert('[close] Connection died');
                    }
                };

                socket.onerror = function(error) {
                    alert(`[error] ${error.message}`);
                };
            },
            loadChat() {
                this.totalChatHeight = this.$refs.chatContainer.scrollHeight
                this.loading = false
                if (this.id !== undefined) {
                    this.chatMessages = []
                    let chatID = this.id
                    this.currentRef = firebase.database().ref('messages').child(chatID).child('messages').limitToLast(20)
                    this.currentRef.on('child_added', this.onNewMessageAdded)
                }
            },
            onScroll() {

            },
            processMessage(message) {
                /*eslint-disable */
                var imageRegex = /([^\s\']+).(?:jpg|jpeg|gif|png)/i
                /*eslint-enable */
                if (imageRegex.test(message.content)) {
                    message.image = imageRegex.exec(message.content)[0]
                }
                var emojiRegex = /([\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{2934}-\u{1f18e}])/gu
                if (emojiRegex.test(message.content)) {
                    message.content = message.content.replace(emojiRegex, '<span class="emoji">$1</span>')
                }
                return message
            },
            sendMessage() {
                if (this.content !== '') {
                    this.$store.dispatch('sendMessage', {
                        username: this.username,
                        content: this.content,
                        date: new Date().toString(),
                        chatID: this.id
                    })
                    this.content = ''
                }
            },
            scrollToEnd() {
                this.$nextTick(() => {
                    var container = this.$el.querySelector('.chat-container')
                    container.scrollTop = container.scrollHeight
                })
            },
            scrollTo() {
                this.$nextTick(() => {
                    let currentHeight = this.$refs.chatContainer.scrollHeight
                    let difference = currentHeight - this.totalChatHeight
                    var container = this.$el.querySelector('.chat-container')
                    container.scrollTop = difference
                })
            },
            addEmojiToMessage(emoji) {
                this.content += emoji.value
            },
            toggleEmojiPanel() {
                this.emojiPanel = !this.emojiPanel
            }
        }
    }
</script>

<style>
    .scrollable {
        overflow-y: auto;
        height: 90vh;
    }

    .typer {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        bottom: 0;
        height: 4.9rem;
        width: 100%;
        background-color: #fff;
        box-shadow: 0 -5px 10px -5px rgba(0, 0, 0, .2);
    }

    .typer input[type=text] {
        left: 2.5rem;
        padding: 1rem;
        width: 80%;
        background-color: transparent;
        border: none;
        outline: none;
        font-size: 1.25rem;
    }

    .chat-container {
        box-sizing: border-box;
        height: calc(100vh - 9.5rem);
        overflow-y: auto;
        padding: 10px;
        background-color: #f2f2f2;
    }

    .message {
        margin-bottom: 3px;
    }

    .message.own {
        text-align: right;
    }

    .message.own .content {
        background-color: lightskyblue;
    }

    .chat-container .username {
        font-size: 18px;
        font-weight: bold;
    }

    .chat-container .content {
        padding: 8px;
        background-color: lightgreen;
        border-radius: 10px;
        display: inline-block;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12);
        max-width: 50%;
        word-wrap: break-word;
    }

    @media (max-width: 480px) {
        .chat-container .content {
            max-width: 60%;
        }
    }

</style>
