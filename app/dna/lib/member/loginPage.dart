import 'dart:convert';
import 'dart:ffi';

import 'package:dna/member/widget/joinWidget.dart';
import 'package:dna/member/widget/textField.dart';
import 'package:dna/member/widget/toggleButton.dart';
import 'package:dna/mypage/GetMyPageController.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_blue/flutter_blue.dart';
import 'package:flutter_native_splash/flutter_native_splash.dart';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'package:permission_handler/permission_handler.dart';
import '../mainPage.dart';
import '../widget/sizeBox.dart';
import 'findPage.dart';
import 'joinPage.dart';



class loginPage extends StatefulWidget {
  const loginPage({super.key});

  @override
  State<loginPage> createState() => _loginPageState();
}

class _loginPageState extends State<loginPage> {
  FlutterBlue flutterBlue = FlutterBlue.instance;
  List<ScanResult> scanResultList = [];

  static const platform = MethodChannel('rhythm_channel');

  Future<void> _getNativeValue() async {
    String value;

    try{
      value = await platform.invokeMethod("getBle");
    } on PlatformException catch (e){
      value = 'native code error: ${e.message}';
    }

    setState(() {

    });
  }

  // void initBle() async {
  //   await _getNativeValue();
  //   flutterBlue.isScaning.listen((isScanning) {
  //     setState(() {
  //
  //     });
  //   });
  // }

  void test() async{
    bool value;

    try{
      value = await platform.invokeMethod("getConnect");
      print(value);
    } on PlatformException catch (e){
      print('getCpnnect False.');
    }
  }

  MypageController mypageController = Get.put(MypageController());
  TextEditingController idCon = TextEditingController();
  TextEditingController pwCon = TextEditingController();

  // toggle 변수
  bool isGuard = true;
  bool isUser = false;
  late List<bool> isSelected;

  // isSelected 초기화
  @override
  void initState() {
    isSelected = [isGuard, isUser];
    super.initState();
    initialization();

    //ble instance 생성
    // initBle();
  }

  void initialization() async {
    await Future.delayed(Duration(seconds: 3));
    FlutterNativeSplash.remove();
  }

  // 로그인 버튼 클릭 시, 입력한 (보호자or사용자)/id/pw 출력
  void printIdPw(bool who, idCon, pwCon) {
    print(who);
    print(idCon.text);
    print(pwCon.text);
  }

  // 로그인 서버 통신 함수
  void login(bool who, idCon, pwCon) async {
    print("start");
    String url = "http://192.168.70.230:3333/user/login";
    http.Response res = await http.post(Uri.parse(url),
        headers: <String, String>{'Content-Type': 'application/json'},
        body: jsonEncode({'user': who, 'id': idCon.text, 'pw': pwCon.text}));

    // 로그인 결과를 받아와 변수에 저장
    var resData = jsonDecode(res.body);
    mypageController.setUserData(resData);
    print(resData);

    setState(() {
      if (resData["loginResult"] != false) {
        Get.off(() => mainPage());
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
          content: Text(
              '${resData["loginResult"]["name"]}(${resData["loginResult"]["nick"]})님 환영합니다.'),
          duration: const Duration(seconds: 2),
        ));
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: ListView(
          padding: EdgeInsets.all(MediaQuery.of(context).size.width * 0.1),
          children: [
            Container(
              height: MediaQuery.of(context).size.height * 0.87,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    children: [
                      TextButton(
                          child: Image.asset('image/logo.png'),
                          onPressed: () {
                            Get.off(() => mainPage());
                          }),
                      SizeBoxH50,
                      toggleButton(context, isSelected, toggleSelect),
                      SizeBoxH30,
                      textField(idCon, "아이디"),
                      SizeBoxH10,
                      textField(pwCon, "비밀번호"),
                      SizeBoxH40,
                      // FlaltButton 은 화면 위에 떠있는 동그란 버튼
                      ElevatedButton(
                        style: ElevatedButton.styleFrom(
                            backgroundColor: Color(0xff2e2288)),
                        child: Container(
                          width: double.infinity,
                          height: 50,
                          child: Center(child: Text('로그인')),
                        ),
                        onPressed: () async {
                          // 로그인 버튼 클릭 시, id pw 를 run 창에 출력
                          // true : 보호자, false : 사용자
                          // printIdPw(isGuard, idCon, pwCon);
                          // 로그인 버튼 클릭 시, 액션을 여기에 넣으면 됨
                          // login(isGuard, idCon, pwCon);
                          test();
                          // // 블루투스 활성화 여부 확인
                          // bool isBluetoothEnabled =
                          //     await FlutterBlue.instance.isOn;
                          // if (!isBluetoothEnabled) {
                          //   // 블루투스가 비활성화된 경우 활성화 요청
                          //   await ScaffoldMessenger.of(context)
                          //       .showSnackBar(SnackBar(
                          //     content: Text('블루투스 연결필요'),
                          //     duration: const Duration(seconds: 2),
                          //   ));
                          // }
                        },
                      ),
                      SizeBoxH20,
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          TextButton(
                              onPressed: () {
                                Get.to(() => findPage());
                              },
                              child: Text('아이디 찾기',
                                  style: TextStyle(color: Colors.black))),
                          TextButton(
                              onPressed: () {
                                Get.to(() => findPage());
                              },
                              child: Text('비밀번호 찾기',
                                  style: TextStyle(color: Colors.black))),
                        ],
                      )
                    ],
                  ),
                  joinWidget(),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  // toggle 함수
  void toggleSelect(value) {
    if (value == 0) {
      isGuard = true;
      isUser = false;
    } else {
      isGuard = false;
      isUser = true;
    }
    setState(() {
      isSelected = [isGuard, isUser];
    });
  }
}
