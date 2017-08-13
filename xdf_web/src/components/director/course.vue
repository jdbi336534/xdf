<template>
    <div class="course">
        <h2 class="course-title">四折标课情况</h2>
        <div class="upload">
            <Upload type="drag" action="/node/api/course" :on-success="handleSuccess" :before-upload="handleBeforeUpload">
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff" :show-upload-list="false"></Icon>
                    <p>点击或将文件拖拽到这里上传(四折标课Excel)</p>
                </div>
            </Upload>
        </div>
        <p class="result-title">上传结果如下：</p>
        <div class="upload-result">
            <Table :columns="columns1" :data="data2" size="small" stripe></Table>
        </div>
        <Form>
            <Form-item class="btngroup">
                <Button type="primary">下一步</Button>
            </Form-item>
        </Form>
    </div>
</template>
<script>
import { } from '../../services/query';
export default {
    data() {
        return {
            columns1: [
                {
                    title: '校区',
                    key: 'campus'
                },
                {
                    title: '助理主管',
                    key: 'assistant',

                },
                {
                    title: '教师姓名',
                    key: 'teacher',

                },
                {
                    title: '学生姓名',
                    key: 'student',

                },
                {
                    title: '是否续费',
                    key: 'isrenew',

                },
                {
                    title: '补救措施',
                    key: 'measures',
                    ellipsis: true
                }
            ],
            data2: [
            ]
        }
    },
    methods: {
        handleSuccess(res, file) {
            try {
                if (res.code === 200) {
                    this.data2 = res.data;
                }
            } catch (err) {
                this.data2 = [];
                throw new Error(err);
            }
            console.log(res);
        },
        handleBeforeUpload() {

        }
    }
};

</script>
<style lang="scss" scoped>
.course {
    width: 100%;
    padding: 0 20px;
    margin: 10px auto;
    .course-title {
        text-align: center;
        border-bottom: 1px solid #666;
        padding: 10px 0;
        margin-bottom: 40px;
    }
    .upload {
        width: 600px;
        margin: 0 auto;
    }
    .result-title {
        font-size: 14px;
        padding: 20px 0;
    }
    .btngroup {
        text-align: center;
        margin-top: 30px;
    }
}
</style>
