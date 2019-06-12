<template>
  <div>
    <div id="sui_nav" class="sui-nav horizontal">
      <div class="sui-nav-wrapper nav-border nav-line">
        <ul>
          <li><a class="text-primary"><span class="glyphicon glyphicon-home"></span> Home</a></li>
          <li><a href="#"><span class="glyphicon glyphicon-comment"></span> About</a>
            <ul>
              <li><a href="#"><span class="glyphicon glyphicon-edit"></span> editor</a></li>
              <li><a href="#"><span class="glyphicon glyphicon-pencil"></span> pencil</a></li>
              <li><a href="#"><span class="glyphicon glyphicon-saved"></span> Level23</a>
                <span class="indicator">&gt;</span>
                <ul>
                  <li><a href="#">Level31</a></li>
                  <li><a href="#">Level32</a></li>
                  <li class="hide-in-horizontal"><a href="#">Level33</a>
                    <ul>
                      <li><a href="#">Level331</a></li>
                      <li><a href="#">Level332</a></li>
                      <li><a href="#">Level333</a></li>
                      <li><a href="#">Level334</a></li>
                    </ul>
                    <span class="indicator">&gt;</span>
                  </li>
                  <li><a href="#">Level34</a></li>
                </ul>
              </li>
              <li><a href="#"><span class="glyphicon glyphicon-save"></span> Level24</a></li>
            </ul>
          </li>
          <li><a class="text-danger"><span class="glyphicon glyphicon-fire"></span> Hello</a></li>
        </ul>

        <ul class="pull-right">
          <li><a class="text-success">Sign in</a></li>
          <li><a class="text-success">Sing up</a></li>
          <li><a class="text-warning">Others</a>
            <ul>
              <li><a>Right</a></li>
              <li><a>Right</a>
                <ul>
                  <li><a>Right</a></li>
                  <li><a>Right</a></li>
                  <li><a>Right</a></li>
                </ul>
              </li>
              <li><a>Others</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <br/>
    <div class="container ">

    </div>
  </div>

</template>

<script>
  import './sui.nav.min.css'
  import './sui.nav.min.js'
  export default {
    name: "header-all",
    mounted(){

    }
  }
</script>

<style scoped>
  .container {
    margin: 10px auto;
  }

  .container .body {
    padding: 0px 10px;
    position: relative;
    padding-left: 220px;
  }

  .nav-second {
    position: relative;
    width: 210px;
    float: left;
  }

  @media only screen and (max-width: 768px) {
    .container .body {
      padding: 0px;
    }
  }
</style>
