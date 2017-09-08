<template>
  <div>
    <div style="border:1px solid rgb(221, 222, 225);width:100%;height:100%;">
      <div style="border-bottom:1px solid rgb(221, 222, 225);padding:10px;font-weight:600;">
        <slot name="title"></slot>
      </div>
      <div style="padding:20px">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>
