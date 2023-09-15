<template>
  <!-- Page Heading -->
  <section class="page-heading">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h1>Forums</h1>
        </div>
        <div class="col-md-6">
          <ul class="breadcrumb">
            <li><a href="javascript:void(0)" @click="$router.push({ name: 'home' })">Home</a></li>
            <li class="active">{{ $route.name == 'home' ? 'Forum' : $route.name }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  <!-- Page Heading / End -->
</template>