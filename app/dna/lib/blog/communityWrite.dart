import 'package:dna/widget/sizeBox.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../controller/GetBlogController.dart';
import 'blogPage.dart';

class communityWrite extends StatefulWidget {
  const communityWrite({super.key});

  @override
  State<communityWrite> createState() => _communityWriteState();
}

class _communityWriteState extends State<communityWrite> {
  BlogController blog = Get.put(BlogController());
  TextEditingController titleCon = TextEditingController();
  TextEditingController contextCon = TextEditingController();

  FocusNode focusNodeTitle = FocusNode();
  FocusNode focusNodeContext = FocusNode();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: GestureDetector(
          onTap: (){
            focusNodeTitle.unfocus();
            focusNodeContext.unfocus();
          },
          child: Container(
            padding: EdgeInsets.only(
                right: MediaQuery.of(context).size.width * 0.05,
                left: MediaQuery.of(context).size.width * 0.05,
              top: 40,
            ),
            child: ListView(
              children: [
                Container(
                  height: MediaQuery.of(context).size.height * 0.83,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: [
                          ElevatedButton(
                            onPressed: () {
                              Navigator.pushAndRemoveUntil(context, MaterialPageRoute(
                                builder: (context) {
                                  return const blogPage();
                                },
                                settings: const RouteSettings(name: 'blogPage'), // RouteSettings 추가
                              ), (route) => false);
                            },
                            child: Text(
                              '목록으로',
                              style: TextStyle(fontSize: 17),
                            ),
                            style: ElevatedButton.styleFrom(
                                backgroundColor: Color(0xff2e2288)),
                          ),
                          SizeBoxH10,
                          Container(
                            decoration: BoxDecoration(
                                border: Border(
                                    top: BorderSide(
                                        color: Color(0xff2e2288), width: 5))),
                          ),
                          TextField(
                            controller: titleCon,
                            style: TextStyle(fontSize: 22),
                            decoration: InputDecoration(
                              hintText: '제목을 입력해주세요.',
                            ),
                            textInputAction: TextInputAction.next,
                            focusNode: focusNodeTitle,
                          ),
                          SizeBoxH10,
                          Container(
                            decoration: BoxDecoration(
                              border: Border(bottom: BorderSide(color: Color(0xffbebebe))),
                            ),
                            child: TextField(
                              controller: contextCon,
                              style: TextStyle(fontSize: 20),
                              decoration: InputDecoration(
                                border: InputBorder.none,
                                hintText: '내용을 입력해주세요.',
                              ),
                              maxLines: 18,
                              focusNode: focusNodeContext,
                            ),
                          ),
                        ],
                      ),
                      ElevatedButton(
                        onPressed: () {
                          setState(() {
                            blog.uploadBoard(titleCon.text, contextCon.text, context);
                          });
                        },
                        child: Padding(
                          padding: const EdgeInsets.all(4.0),
                          child: Text(
                            '등록하기',
                            style: TextStyle(fontSize: 25),
                          ),
                        ),
                        style: ElevatedButton.styleFrom(
                            minimumSize: Size(double.infinity, 0),
                            backgroundColor: Color(0xff2e2288)),
                      )
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
