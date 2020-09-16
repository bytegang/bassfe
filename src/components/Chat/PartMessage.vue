<template>
    <div>
        <div :class="{own: ele.from_user_id != authedUserId}" class="message" v-bind:key="index"
             v-for="(ele,index) in messages">
            <div class="username" v-if="ele.from_user_id != authedUserId">{{receiver}}</div>
            <div class="username" v-if="ele.from_user_id == authedUserId">{{sender}}</div>
            <div style="margin-top: 5px"></div>
            <div class="content">
                <div v-html="ele.payload.body"></div>
                <chat-image :imgsrc="ele.image" @imageLoad="imageLoad" v-if="ele.image"></chat-image>
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
            sender(){
              return this.$store.getters.authedUser.name
            },
            receiver(){
              return this.$store.getters.selectedFriend.name
            },
            authedUserId() {
                return this.$store.getters.authedUser.id
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
