<template>
    <div>
        <div :class="{own: message.user == username}" class="message" v-bind:key="index"
             v-for="(message,index) in messages">
            <div class="username" v-if="index>0 && messages[index-1].user != message.user">{{message.user}}</div>
            <div class="username" v-if="index == 0">{{message.user}}</div>
            <div style="margin-top: 5px"></div>
            <div class="content">
                <div v-html="message.content"></div>
                <chat-image :imgsrc="message.image" @imageLoad="imageLoad" v-if="message.image"></chat-image>
            </div>
        </div>
    </div>
</template>

<script>
    import Image from './PartImage.vue'

    export default {
        data() {
            return {}
        },
        props: [
            'messages'
        ],
        components: {
            'chat-image': Image
        },
        computed: {
            username() {
                return this.$store.getters.user.username
            }
        },
        methods: {
            imageLoad() {
                // this.$emit('imageLoad')
            }
        }
    }
</script>

<style>
    span.emoji {
        font-size: 20px;
        vertical-align: middle;
        line-height: 2;
    }
</style>
