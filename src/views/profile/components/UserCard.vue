<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>我的信息</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb :image="image" :height="'100px'" :width="'100px'" :hoverable="false">
          <div>Hello</div>
          {{ user.role }}
        </pan-thumb>
      </div>
      <div class="box-center" >
        <el-button type="primary" icon="el-icon-upload" style="" @click="imagecropperShow=true">
         修改头像
        </el-button>
        <image-cropper
          v-show="imagecropperShow"
          :key="imagecropperKey"
          :width="160"
          :height="160" 
          url="http://invest.wallyi.com/prod-api/user/avatar_upload"
          lang-type="en"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.name }}</div>
        <div class="user-role text-center text-muted">{{ user.role | uppercaseFirst }}</div>
      </div>
    </div>
    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="education" /><span>Education</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            计算机学士学位
          </div>
        </div>
      </div>

      <div class="user-skills user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="skill" /><span>Skills</span></div>
        <div class="user-bio-section-body">
          <div class="progress-item">
            <span>Python</span>
            <el-progress :percentage="85" status="success"/>
          </div>
          <div class="progress-item">
            <span>Linux</span>
            <el-progress :percentage="80" />
          </div>
          <div class="progress-item">
            <span>Mysql</span>
            <el-progress :percentage="70" />
          </div>
          <div class="progress-item">
            <span>Web</span>
            <el-progress :percentage="60"/>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb'
import ImageCropper from '@/components/ImageCropper'
import { mapGetters } from 'vuex'

export default {
  components: { ImageCropper, PanThumb},
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      image: ''
    }
  },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: mapGetters.name,
          email: mapGetters.email,
          avatar: mapGetters.avatar,
          role: mapGetters.role
        }
      }
    }
  },
  methods: {
    cropSuccess(resData) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.image = resData.files.avatar
      this.$store.dispatch('user/setAvatar', resData.files.avatar)
    },
    close() {
      this.imagecropperShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
