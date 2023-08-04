// truyền mảng trong JS cũng chỉ là truyền tham trị?. truyền mảng vẫn là truyền tham chiếu. CHỐT!!!
//var nhomBai21La = [51, 25, 22, 3, 4, 10, 11, 12, 13, 14, 30, 31, 32, 33, 37, 40, 41, 42, 45, 50, 8];

// Để sửa kích thước nhóm bài, cần:
//0. Sửa lại label bên giao diện HTML Chọn X lá bài ngẫu nhiên
//1. Sửa mangNgauNhienKhongTrung(x);
//2. hienThi(nhomBai) thêm tương ứng cho đủ số dòng
//3. Chỉnh lại lá bài canh chỗ xuất kết quả.
var nhomBai21La = [],
    nhom_I = [],
    nhom_II = [],
    nhom_III = [],
    tapGiao = []; // để bắt trường hợp người chơi cố tình chọn sai.
var demSoLanChia = 0; // bắt đầu đếm từ 1, chia đủ 3 lần cho ra kết quả, tính luôn lần chia khởi tạo đầu tiên.
var soThuTuNhom = 0; // dùng cho việc hiện lên table
var mangDapAn = [];
var nhomTungChon = "";
var chonNhom = document.getElementById("ChonNhom");

mangNgauNhienKhongTrungNhau(21);
// tạo mảng số nguyên ngẫu nhiên không trùng nhau, với size là kích thước mảng
function mangNgauNhienKhongTrungNhau(size) {
    var i = 0;
    var x = Math.floor(Math.random() * 52); // giá trị ngẫu nhiên thuộc [0..51]
    nhomBai21La.push(x);
    i++;
    while (i < size) {
        x = Math.floor(Math.random() * 52);
        if (nhomBai21La.indexOf(x) == -1) {
            nhomBai21La.push(x);
            i++;
        }
    }
    // console.log(nhomBai21La);
}

//tìm giao 2 tập hợp
function giao2TapHop(T1, T2) {
    var kq = [];
    for (var i = 0; i < T1.length; i++) {
        if (T2.indexOf(T1[i]) > -1) {
            kq.push(T1[i]);
        }
    }
    return kq;
}

// mô phỏng việc chia bài theo quy ước lá chia sau nằm đè phía trên lá chia trước, 
// lá nằm trên cùng có chỉ mục là 0 của mảng.
// suy ra nếu lá bài có chỉ mục 0 ban đầu(nằm ở trên cùng của nhóm), 
// thì khi chia nhóm bài đó chỉ mục của lá trên cùng sẽ là cuối mảng(nằm dưới nhất).
function chiaBai() {
    var soLanChiaBai = nhomBai21La.length;
    // console.log(nhomBai21La);
    nhom_I = [];
    nhom_II = [];
    nhom_III = [];
    for (var i = 0; i < soLanChiaBai; i++) {
        nhom_I.unshift(nhomBai21La[i]);
        i++;
        nhom_II.unshift(nhomBai21La[i]);
        i++;
        nhom_III.unshift(nhomBai21La[i]);
    }
    // console.log(nhom_I); console.log(nhom_II); console.log(nhom_III);
}

// gom các nhóm bài theo thứ tự nhóm I trên cùng >> nhóm II ở giữa>> nhóm III dưới đáy.
function gomBai() {
    var soLaBaiMoiNhom = nhom_I.length;
    nhomBai21La = [];
    for (var i = 0; i < soLaBaiMoiNhom; i++) {
        nhomBai21La.push(nhom_I[i]);
    }
    for (var i = 0; i < soLaBaiMoiNhom; i++) {
        nhomBai21La.push(nhom_II[i]);
    }
    for (var i = 0; i < soLaBaiMoiNhom; i++) {
        nhomBai21La.push(nhom_III[i]);
    }
    //console.log(nhomBai21La);
}

// swap THỨ TỰ của nhóm II với nhóm có chứa quân bài bí mật
function swapNhomII(nhomSwap) {
    var tam; // biến trung gian swap giữa các phần tử của 2 mảng
    var soLaBaiMoiNhom = nhom_II.length;
    switch (nhomSwap) {
        case 1:
            for (var i = 0; i < soLaBaiMoiNhom; i++) {
                tam = nhom_II[i];
                nhom_II[i] = nhom_I[i];
                nhom_I[i] = tam;
            }
            break;
        case 3:
            for (var i = 0; i < soLaBaiMoiNhom; i++) {
                tam = nhom_II[i];
                nhom_II[i] = nhom_III[i];
                nhom_III[i] = tam;
            }
            break;
        default: break;
    }
    //console.log(nhom_I); console.log(nhom_II); console.log(nhom_III);
}

function hienThi(nhomBai) {
    var tbody = document.getElementsByTagName("tbody")[0];
    var noiDungLaBai = document.getElementsByTagName("li");
    //soThuTuNhom++;
    //console.log(noiDungLaBai[0]);
    var content = "";
    for (var i = 0; i < nhomBai.length;) {
        if(soThuTuNhom >= 3){soThuTuNhom = 0;}
        content += `
        <tr>
            <td>Nhóm ${++soThuTuNhom}</td>
            <td>${noiDungLaBai[nhomBai[i++]].outerHTML}</td>
            <td>${noiDungLaBai[nhomBai[i++]].outerHTML}</td>
            <td>${noiDungLaBai[nhomBai[i++]].outerHTML}</td>
            <td>${noiDungLaBai[nhomBai[i++]].outerHTML}</td>
            <td>${noiDungLaBai[nhomBai[i++]].outerHTML}</td>
            <td>${noiDungLaBai[nhomBai[i++]].outerHTML}</td>
            <td>${noiDungLaBai[nhomBai[i++]].outerHTML}</td>
            
        </tr>
        `;
    }
    tbody.innerHTML += content;
}

function begin() {
    // debugger;
    console.log(nhomBai21La);
    demSoLanChia++;
    chiaBai(nhomBai21La, nhom_I, nhom_II, nhom_III);
    document.getElementById("SoLanChia").innerHTML = demSoLanChia;
    console.log(nhom_I); console.log(nhom_II); console.log(nhom_III);
    hienThi(nhom_I);
    hienThi(nhom_II);
    hienThi(nhom_III);
    soThuTuNhom = 0;
    duaVaoMangDapAn(nhom_I);
    duaVaoMangDapAn(nhom_II);
    duaVaoMangDapAn(nhom_III);
}

function tiepTuc() {
    //debugger;
    if (demSoLanChia == 1) {
        switch (chonNhom.value) {
            case "1": tapGiao = nhom_I.map(i=>i); break;
            case "2": tapGiao = nhom_II.map(i=>i); break;
            case "3": tapGiao = nhom_III.map(i=>i); break;
        }
        console.log(tapGiao);
    }
    if (demSoLanChia == 2) {
        switch (chonNhom.value) {
            case "1": tapGiao = giao2TapHop(tapGiao, nhom_I); break;
            case "2": tapGiao = giao2TapHop(tapGiao, nhom_II); break;
            case "3": tapGiao = giao2TapHop(tapGiao, nhom_III); break;
        }
        console.log(tapGiao);
    }

    console.log(demSoLanChia);
    if (demSoLanChia < 3) {
        switch (chonNhom.value) {
            case "1": swapNhomII(1); break;
            case "3": swapNhomII(3); break;
            default: break;
        }
        nhomTungChon += chonNhom.value + "__";
        gomBai();
        console.log(nhomBai21La);
        chiaBai();
        demSoLanChia++;
        document.getElementById("SoLanChia").innerHTML = demSoLanChia;
        document.getElementById("nhomTungChon").innerHTML = nhomTungChon;
        console.log(nhom_I); console.log(nhom_II); console.log(nhom_III);
        document.getElementsByTagName("tbody")[0].innerHTML = "";
        hienThi(nhom_I);
        hienThi(nhom_II);
        hienThi(nhom_III);
        duaVaoMangDapAn(nhom_I);
        duaVaoMangDapAn(nhom_II);
        duaVaoMangDapAn(nhom_III);
        soThuTuNhom = 0;
    }
    else {
        switch (chonNhom.value) {
            case "1": tapGiao = giao2TapHop(tapGiao, nhom_I); break;
            case "2": tapGiao = giao2TapHop(tapGiao, nhom_II); break;
            case "3": tapGiao = giao2TapHop(tapGiao, nhom_III); break;
        }
        nhomTungChon += chonNhom.value + "__";
        document.getElementById("nhomTungChon").innerHTML = nhomTungChon;
        console.log(tapGiao);
        if (tapGiao.length == 0) { alert("Buồn quá! Bạn không chung thủy với sự lựa chọn của bạn."); }
        else {
            document.getElementsByTagName("tbody")[0].innerHTML = "";
            var kq;
            switch (chonNhom.value) {
                case "1":
                    document.getElementById("KetQua").innerHTML = "Lá bài bí mật là: " + document.getElementsByTagName("li")[nhom_I[3]].outerHTML;
                    break;
                case "2":
                    document.getElementById("KetQua").innerHTML = "Lá bài bí mật là: " + document.getElementsByTagName("li")[nhom_II[3]].outerHTML;
                    break;
                case "3":
                    document.getElementById("KetQua").innerHTML = "Lá bài bí mật là: " + document.getElementsByTagName("li")[nhom_III[3]].outerHTML;
                    break;
            }
        }

    }
}
function xemLichSu(){
    soThuTuNhom = 0;
    document.getElementsByTagName("tbody")[0].innerHTML = "";
    hienThi(mangDapAn);
}
function duaVaoMangDapAn(nhom){
    for(var i = 0; i < nhom.length; i++){
        mangDapAn.push(nhom[i]);
    }
   
}