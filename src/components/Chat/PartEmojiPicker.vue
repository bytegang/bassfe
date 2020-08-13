<template>
    <div class="emoji-picker" v-if="show">
        <v-card height="300px" v-if="show">
            <v-card-title class="blue white--text">
                <span class="headline">Emoji Picker</span>
            </v-card-title>
            <v-card-text>
                <div class="emoji-content">
                    <part-emoji :emoji="emoji" @click="onEmojiClick" v-bind:key="emoji.key" v-for="emoji in emojis"></part-emoji>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    import PartEmoji from './PartEmoji.vue'

    export default {
        data() {
            return {
            }
        },
        props: {
            show: true,
        },
        created() {

        },
        computed:{
          emojis(){
               return this.$store.getters.emojis;
          },
        },
        methods: {
            onEmojiClick(emoji) {
                this.$emit('click', emoji)
            },
            closePicker() {
                this.$emit('close')
            }
        },
        components: {
            PartEmoji
        }
    }
</script>

<style>
    .emoji-picker {
        background: white;
        bottom: 5rem;
        left: 0;
        /*width: 200px;*/
        user-select: none;
    }

    .emoji-picker .emoji-header {
        display: flex;
        padding: 5px;
        box-shadow: 0px 5px 9px 0px rgba(0, 0, 0, 0.15);
    }

    .emoji-picker .emoji-header .emoji-close {
        margin-left: auto;
    }

    .emoji-picker .emoji-content {
        margin-top: 10px;
        overflow-y: auto;
        height: 200px;
    }

    .emoji-picker span {
        cursor: pointer;
        font-size: 25px;
    }
</style>
