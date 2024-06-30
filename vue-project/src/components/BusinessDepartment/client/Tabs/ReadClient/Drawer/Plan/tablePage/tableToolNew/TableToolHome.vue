<template>
    <div style="width:1600px;">
        <div id="leftContainer" style="float: left; width: 800px;">
            <oneInput @update="handleUpdateForOne"></oneInput>
            <hr style="border-color: red;">
            <twoInput @update="handleUpdateForTwo"></twoInput>
            <hr style="border-color: red;">
            <threeInput :dataObject="storeData" @update="handleUpdateForThree"></threeInput>
        </div>
        <div id="rightContainer" style="float: right; width: 750px; background-color: lightblue; padding: 15px">
            <!-- 打印区域 -->
            <div id="printRegion">
                <div v-for="(element, index) in htmlDiv" :key="index" v-html="element.htmlElement"></div>
            </div>
            <button @click="printFun">打印</button>
            <button @click="printAndSaveAsPDF">打印2</button>

        </div>
    </div>
   
</template>

<script lang="ts">

// <div ref="pdfContainer">
//         <!-- PDF 预览区域 -->
//         <vue-pdf :src="pdfSrc" :page="page" :rotate="rotate" :scale="scale" :show-toolbar="showToolbar"
//             :show-sidebar="showSidebar" :show-annotations="showAnnotations" :progressive-render="progressiveRender"
//             :max-pages="maxPages" @num-pages="onNumPages" @page-loaded="onPageLoaded" @page-changed="onPageChanged"
//             @error="onError"></vue-pdf>
//     </div>
//     <button @click="downloadPDF">下载 PDF</button>
import oneInput from './component/oneInput.vue';
import twoInput from './component/twoInput.vue';
import threeInput from './component/threeInput.vue';
import { reactive, ref } from 'vue';
import VuePdf from 'vue-pdf';
import html2pdf from 'html2pdf.js';

export default {
    components: {
        oneInput,
        twoInput,
        threeInput
    },
    setup() {
        const htmlDiv = ref<any>([]);
        //  const storeData = ref();
        const storeData = reactive({
            dataOne: null,
            dataTwo: null,
        });

        // ##
        // const pdfContainer = ref(null);
        // const pdfSrc = 'https://www.example.com/example.pdf'; // PDF 文件的 URL
        // let numPages = 0;
        // let currentPage = 1;

        // // PDF 预览参数
        // const page = 1;
        // const rotate = 0;
        // const scale = 1.0;
        // const showToolbar = true;
        // const showSidebar = true;
        // const showAnnotations = true;
        // const progressiveRender = true;
        // const maxPages = 10;

        // // 处理 PDF 预览事件
        // const onNumPages = (num: any) => {
        //     numPages = num;
        // };
        // const onPageLoaded = () => {
        //     console.log('Page loaded');
        // };
        // const onPageChanged = (page: any) => {
        //     currentPage = page;
        // };
        // const onError = (error: any) => {
        //     console.error('Error: ' + error);
        // };

        // // 下载 PDF 文件
        // const downloadPDF = () => {
        //     const options = {
        //         margin: [0, 0, 0, 0],
        //         filename: 'example.pdf',
        //         image: { type: 'jpeg', quality: 0.98 },
        //         html2canvas: { scale: 2 },
        //         jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        //     };
        //     html2pdf().set(options).from(pdfContainer.value).save();
        // };
        // ##

        // const downLoadImgFun = () => {
        //     printAndSaveAsPDF() {
        //         // 获取需要打印的内容
        //         const printContent = this.$refs.printContent.innerHTML;

        //         // 配置选项
        //         const options = {
        //             margin: 1,
        //             filename: 'myfile.pdf',
        //             image: { type: 'jpeg', quality: 0.98 },
        //             html2canvas: { dpi: 192, letterRendering: true },
        //             jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        //         };

        //         // 使用 html2pdf 将 HTML 转换为 PDF 并保存
        //         html2pdf().from(printContent).set(options).save();
        //     }
        // }


        function printAndSaveAsPDF() {
            // // 获取打印内容
            // // const printContent = this.$refs.printContent;
            // const printContent = ref<HTMLElement | any>(document.getElementById("printRegion"));

            // // 创建一个 PDF 文档
            // const pdf = new VuePdf({
            //     data: printContent.innerHTML
            // });

            // // 将 PDF 导出为文件
            // pdf.getPDF().then((pdfData:any) => {
            //     html2pdf().from(pdfData).save();
            // });
        }



        // --------
        const printFun = () => {


            const getDomForPrint = ref<HTMLElement | any>(document.getElementById("printRegion"));
            // 打开新窗口并显示表格预览
            var w = window.open('');
            if (w) {
                w.document.write(`
                            <html>
                                <head>
                                <title>附件-清单参考</title>
                                <style>
                                    /* Your table styles here */
                                    table {
                                    border-collapse: collapse;
                                    }
                                    th, td {
                                    border: 1px solid black;
                                    padding: 8px;
                                    text-align: left;
                                    }
                                    th {
                                    background-color: #ddd;
                                    }
                                    @page{
                                        size:portrait;
                                    }
                                    body{
                                        padding:20px;
                                    }
                                </style>
                                </head>
                                <body>
                                ${getDomForPrint.value.outerHTML}
                                </body>
                            </html>
                            `);
                // 执行打印操作
                // onbeforePrint();
                w.print();
                w.close();
            }
        }
        const handleUpdateForOne = (data: any, data2: any) => { // 参数1：DOM ，参数2：数据
            console.log("getDom:", data);
            // getData = { ...data };
            // handAddHTML()
            console.log(data, data2);
            // getBeginValue = {...data2};
            handAddHTML(data);
            storeData.dataOne = data2;
        }
        const handleUpdateForTwo = (data: any, data2: any) => { // 参数1: DOM , 参数2：数据
            // console.log(data);
            // getData = { ...data };
            handAddHTMLTwo(data);
            storeData.dataTwo = data2;
            // console.log("storeData",storeData);
        }
        const handleUpdateForThree = (data: any) => { // 参数1: DOM , 参数2：数据
            console.log("handleUpdateForThree", data);
            // getData = { ...data };
            // handAddHTMLTwo(data);
            // storeData.value = data2;
            // console.log("storeData",storeData);
            handAddHTMLThree(data);
        }


        const handAddHTML = (domData: any) => {
            htmlDiv.value.push({
                htmlElement: domData.outerHTML,
                attr: {
                    class: 'tag',
                },
            });
        }
        const handAddHTMLTwo = (domData: any) => {
            htmlDiv.value.push({
                htmlElement: domData,
                attr: {
                    class: 'tag',
                },
            });
        }
        const handAddHTMLThree = (domData: any) => {
            htmlDiv.value.push({
                htmlElement: domData.outerHTML,
                attr: {
                    class: 'tag',
                },
            });
        }
        return {
            handleUpdateForOne,
            handleUpdateForTwo,
            handleUpdateForThree,
            htmlDiv,
            storeData,
            printFun,
            printAndSaveAsPDF,
            // downLoadImgFun
            // pdfContainer,
            // pdfSrc,
            // page,
            // rotate,
            // scale,
            // showToolbar,
            // showSidebar,
            // showAnnotations,
            // progressiveRender,
            // maxPages,
            // onNumPages,
            // onPageLoaded,
            // onPageChanged,
            // onError,
            // downloadPDF,
        }
    }
}



</script>