<template>
  <div>
    <div>
      <a-button type="primary">
        Primary
      </a-button>
      <a-button>Default</a-button>
      <a-button type="dashed">
        Dashed
      </a-button>
      <a-button type="danger">
        Danger
      </a-button>
      <a-config-provider :auto-insert-space-in-button="false">
        <a-button type="primary">
          按钮
        </a-button>
      </a-config-provider>
      <a-button type="primary">
        按钮
      </a-button>
      <a-button type="link">
        Link
      </a-button>
    </div>
    <hr>
    <div>
      <h4>Basic</h4>
      <a-button-group>
        <a-button>Cancel</a-button>
        <a-button type="primary">
          OK
        </a-button>
      </a-button-group>
      <a-button-group>
        <a-button disabled>
          L
        </a-button>
        <a-button disabled>
          M
        </a-button>
        <a-button disabled>
          R
        </a-button>
      </a-button-group>
      <a-button-group>
        <a-button type="primary">
          L
        </a-button>
        <a-button>M</a-button>
        <a-button>M</a-button>
        <a-button type="dashed">
          R
        </a-button>
      </a-button-group>
      
      <h4>With Icon</h4>
      <a-button-group>
        <a-button type="primary">
          <a-icon type="left"/>
          Go back
        </a-button>
        <a-button type="primary"> Go forward
          <a-icon type="right"/>
        </a-button>
      </a-button-group>
      <a-button-group>
        <a-button type="primary" icon="cloud"/>
        <a-button type="primary" icon="cloud-download"/>
      </a-button-group>
    </div>
    <hr>
  
    <div>
      <a-button type="primary" shape="circle" icon="search"/>
      <a-button type="primary" shape="circle">
        A
      </a-button>
      <a-button type="primary" icon="search">
        Search
      </a-button>
      <a-button shape="circle" icon="search"/>
      <a-button icon="search">
        Search
      </a-button>
      <a-button shape="circle" icon="search"/>
      <a-button icon="search">
        Search
      </a-button>
      <a-button type="dashed" shape="circle" icon="search"/>
      <a-button type="dashed" icon="search">
        Search
      </a-button>
    </div>
    <hr>
  
    <div :style="{ background: 'rgb(190, 200, 200)', padding: '26px 16px 16px' }">
      <a-button type="primary" ghost>
        Primary
      </a-button>
      <a-button ghost>
        Default
      </a-button>
      <a-button type="dashed" ghost>
        Dashed
      </a-button>
      <a-button type="danger" ghost>
        Danger
      </a-button>
      <a-button type="link" ghost>
        Link
      </a-button>
    </div>
    <hr>
  
    <div>
      <a-button type="primary" loading>
        Loading
      </a-button>
      <a-button type="primary" size="small" loading>
        Loading
      </a-button>
      <br/>
      <a-button type="primary" :loading="loading" @mouseenter="enterLoading">
        mouseenter me!
      </a-button>
      <a-button type="primary" icon="poweroff" :loading="iconLoading" @click="enterIconLoading">
        延迟1s
      </a-button>
      <br/>
      <a-button type="primary" loading/>
      <a-button type="primary" shape="circle" loading/>
      <a-button type="danger" shape="round" loading/>
    </div>
    <hr>
  
    <div>
      <a-button type="primary">
        Primary
      </a-button>
      <a-button>secondary</a-button>
      <a-dropdown>
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="1">
            1st item
          </a-menu-item>
          <a-menu-item key="2">
            2nd item
          </a-menu-item>
          <a-menu-item key="3">
            3rd item
          </a-menu-item>
        </a-menu>
        <a-button> Actions <a-icon type="down" /> </a-button>
      </a-dropdown>
    </div>
    <hr>
  
    <div>
      <a-radio-group :value="size" @change="handleSizeChange">
        <a-radio-button value="large">
          Large
        </a-radio-button>
        <a-radio-button value="default">
          Default
        </a-radio-button>
        <a-radio-button value="small">
          Small
        </a-radio-button>
      </a-radio-group>
      <br><br>
      <a-button type="primary" :size="size">
        Primary
      </a-button>
      <a-button :size="size">
        Normal
      </a-button>
      <a-button type="dashed" :size="size">
        Dashed
      </a-button>
      <a-button type="danger" :size="size">
        Danger
      </a-button>
      <a-button type="link" :size="size">
        Link
      </a-button>
      <br>
      <a-button type="primary" icon="download" :size="size" />
      <a-button type="primary" shape="circle" icon="download" :size="size" />
      <a-button type="primary" shape="round" icon="download" :size="size" />Download</a-button>
      <a-button type="primary" shape="round" icon="download" :size="size" />
      <a-button type="primary" icon="download" :size="size">
        Download
      </a-button>
      <br>
      <a-button-group :size="size">
        <a-button type="primary">
          <a-icon type="left" />Backward
        </a-button>
        <a-button type="primary">
          Forward<a-icon type="right" />
        </a-button>
      </a-button-group>
    </div>
    <hr>
    <div>
      <a-button type="primary" block>
        Primary
      </a-button>
      <a-button block>
        Default
      </a-button>
      <a-button type="dashed" block>
        Dashed
      </a-button>
      <a-button type="danger" block>
        Danger
      </a-button>
      <a-button type="link" block>
        Link
      </a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Buttons",
  data() {
    return {
      loading: false,
      iconLoading: false,
      size:'large'
    };
  },
  methods: {
    enterLoading() {
      this.loading = true;
    },
    enterIconLoading() {
      this.iconLoading = {delay: 1000};
    },
    handleMenuClick(e) {
      console.log('click', e);
    },
    handleSizeChange(e) {
      this.size = e.target.value;
    },
  },
}
</script>

<style scoped>
>>> div > button {
  margin: 2px 5px;
}
</style>