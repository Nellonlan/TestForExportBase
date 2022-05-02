<template>
    <div>
        <div v-if="errored" class="alert alert-danger" role="alert">
            Комментарии не загрузились!
        </div>
        <div v-else-if="posts.length > 0" class="reviews">
            <div v-for="post in posts" :key="post.id" class="reviews__item">
                <div class="reviews__head">
                    <div class="reviews__name">
                        {{ post.title }}
                    </div>
                    <div class="reviews__date">
                        {{ post.created_at }}
                    </div>
                </div>
                <div class="reviews__desk">
                    {{ post.description }}
                </div>
                <div class="reviews__del">
                    <button @click="deletePost(post.id)" class="reviews__btn"></button>
                </div>
            </div>
        </div>
        <div v-else class="review__empty">
            Отзывов пока нет) Будьте первым! 0/
        </div>

        <validation-errors v-if="validationErrors" :errors="validationErrors">
        </validation-errors>
        <form @submit.prevent="addPost" class="addreview">
            <div class="addreview__name">
                <input v-model="post.title" type="text" name="name" placeholder="Имя и Фамилия">
            </div>
            <div class="addreview__text">
                <textarea v-model="post.description" name="review" id="" cols="30" rows="10" placeholder="Комментарий"></textarea>
            </div>
            <div class="addreview__btn">
                <button>Добавить комментарий</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            posts: [],
            post: {
                id: '',
                title: '',
                description: ''
            },
            post_id: '',
            edit: false,
            loading: true,
            errored: false,
            validationErrors: ''
        }
    },
    mounted() {
        this.getPosts()
    },
    methods: {
        getPosts() {
            axios
                .get('/api/posts')
                .then(response => this.posts = response.data)
                .catch(error => {
                    console.log(error)
                    this.errored = true;
                })
                .finally(() => this.loading = false)
        },
        deletePost(id) {
            axios
                .delete(`/api/posts/${id}`)
                .then(response => {
                    this.getPosts()
                    console.log(response)
                })
                .catch(error => console.log(error))
        },
        addPost() {
            axios
                .post('/api/posts', {
                    title: this.post.title,
                    description: this.post.description,
                })
                .then(response => {
                    this.post.title = ''
                    this.post.description = ''
                    this.getPosts()
                    console.log(response)
                    this.validationErrors = ''
                })
                .catch(error => {
                    if (error.response.status === 422) {
                        this.validationErrors = error.response.data.errors
                    }
                })
        }   
    },
}
</script>

<style scoped>
.reviews {
  max-width: 800px;
  margin: 0 auto; 
  color: #273849;
}
.reviews__item {
  padding: 15px;
  background-color: #42b983;
  margin-bottom: 25px;
  border-radius: 20px;
  position: relative;
}
.reviews__del button {
    background-image: url(/images/trash_icon.svg);
    width: 20px;
    height: 20px;
    position: absolute;
    right: 16px;
    top: 19px;
    border: 0;
    background-color: transparent;
}
.reviews__head {
    display: flex;
    justify-content: space-between;
    max-width: 700px;
    margin: 0 auto;
    padding: 10px;
    font-weight: bold;
}
.reviews__desk {
    max-width: 700px;
    margin: 0 auto;
    background-color: #fff;
    padding: 20px;
}
.addreview {
  padding: 15px;
  background-color: #42b983;
  margin-bottom: 25px;
  border-radius: 20px;
  position: relative;
}
.addreview {
    max-width: 800px;
    margin: 0 auto;
}
.addreview__name {
  width: 300px;
}
.addreview__text {
  padding: 10px;
}
.addreview__text textarea {
  width: 100%;
}
.addreview__name input {
    height: 25px;
    padding: 10px;
}
.addreview__text textarea {
    padding: 10px;
    font-size: 16px;
}
.review__empty {
    margin: 50px auto;
    text-align: center;
    font-size: 25px;
    font-weight: bold;
}
.addreview__name, .addreview__btn {
    margin-left: 10px;
}
.addreview__btn button {
    padding: 5px;
    border-radius: 10px;
} 
</style>
