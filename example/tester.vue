<template>
  <div>
    <h1>GET</h1>
    <button type="button" @click="doHello">World</button>
    <!-- <button type="button">GetUser</button> -->
    <!-- <button type="button">Daily</button> -->
    <!-- <button type="button">MSG</button> -->
  </div>
  <div>
    <h1>POST</h1>
    <button type="button" @click="doLogin">Login</button>
    <button type="button" @click="doRegister">Register</button>
    <!-- <button type="button" @click="doPostUser">PostUser</button> -->
  </div>
  <!-- <button type="button" @click="doPut">PUT</button>
  <button type="button" @click="doDelete">DELETE</button> -->
</template>

<script>
export default {
  data() {
    return {
      links: {
        hello: "http://localhost:8000/",
        user: "http://localhost:8000/user",
        daily: "http://localhost:8000/daily",
        login: "http://localhost:8000/login",
        register: "http://localhost:8000/register",
        get_msg: "http://localhost:8000/get_msg",
      },
      body: {
        login: {
          username: "test",
          password: "123456",
        },
        register: {
          username: "test",
          password: "123456",
          nickname: "測試蝸蝸",
          email: "test@example.com",
        },
      },
    };
  },
  methods: {
    doHello() {
      this.axios.get(this.links.hello).then((response) => {
        console.log(response.status);
        console.log(response);
      });
    },
    doLogin() {
      this.axios({
        method: "POST",
        url: this.links.login,
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          // "Access-Control-Allow-Origin": "*",
        },
        data: this.body.login,
      }).then((response) => {
        console.log(response.status);
        console.log(response);
      });
    },
    doRegister() {
      this.axios({
        method: "POST",
        url: this.links.register,
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          // "Access-Control-Allow-Origin": "*",
        },
        data: this.body.register,
      }).then((response) => {
        console.log(response.status);
        console.log(response);
      });
    },
    // doPostUser() {
    //   this.axios({
    //     method: "POST",
    //     url: this.links.user,
    //     headers: {
    //       "Content-Type": "application/json",
    //       "X-Requested-With": "XMLHttpRequest",
    //       authorization: "Bearer 123",
    //       // "Access-Control-Allow-Origin": "*",
    //     },
    //     data: this.body.register,
    //   }).then((response) => {
    //     console.log(response.status);
    //     console.log(response);
    //   });
    // },
  },
};
</script>
