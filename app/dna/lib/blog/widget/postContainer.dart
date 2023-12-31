import 'dart:convert';
import 'dart:core';
import 'dart:typed_data';

import 'package:dna/blog/communityView.dart';
import 'package:dna/blog/communityWrite.dart';
import 'package:dna/controller/GetMyPageController.dart';
import 'package:dna/widget/sizeBox.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../controller/GetBlogController.dart';
import '../../url.dart';

class postContainer extends StatefulWidget {
  const postContainer({Key? key, required this.index}) : super(key: key);
  // final Map<String, dynamic> dataDB;
  final int index;

  @override
  State<postContainer> createState() => _postContainerState();
}

class _postContainerState extends State<postContainer> {
  BlogController blog = Get.put(BlogController());

  late bool likeBool = false;

  @override
  void initState() {
    super.initState();
    fetchData();
  }

  void fetchData() async {
    int likeResult = await blog.getIsLiked(blog.viewList[widget.index]["bd_idx"]);
    setState(() {
      if(likeResult != -1){
        likeBool = true;
      }else{
        likeBool = false;
      }
    });
  }

  TextStyle textStyle = TextStyle(fontSize: 20);

  @override
  Widget build(BuildContext context) {
    return TextButton(
      onPressed: () {
        // Navigator.push(context, MaterialPageRoute(builder: (context) {
        //   return communityView(dataDB: widget.dataDB, isLike: likeBool);
        // },));
        Navigator.pushAndRemoveUntil(context, MaterialPageRoute(
          builder: (context) {
            return communityView(dataDB: blog.viewList[widget.index], isLike: likeBool);
          },
          settings: const RouteSettings(name: 'communityView'), // RouteSettings 추가
        ), (route) => false);
      },
      style: TextButton.styleFrom(
        padding: EdgeInsets.zero,
        foregroundColor: Colors.black,
      ),
      child: Container(
        decoration: BoxDecoration(border: Border(bottom: BorderSide())),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizeBoxH20,
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'no. ${blog.viewList[widget.index]["bd_idx"]}',
                  style: textStyle,
                ),
                Row(
                  children: [
                    Image.asset(
                      likeBool
                          ? 'image/trueLike_icon.png'
                          : 'image/falseLike_icon.png',
                      height: 25,
                    ),
                    SizedBox(
                      width: 5,
                    ),
                    SizedBox(
                      width: 25,
                      child: Text(
                        "${blog.viewList[widget.index]["bd_likes"]}",
                        style: textStyle,
                      ),
                    ),
                    Image.asset(
                      'image/view.png',
                      height: 25,
                    ),
                    SizedBox(
                      width: 5,
                    ),
                    SizedBox(
                      width: 40,
                      child: Text(
                          '${blog.viewList[widget.index]["bd_views"]}', style: textStyle),
                    ),
                  ],
                ),
              ],
            ),
            SizeBoxH20,
            Row(
              children: [
                ClipOval(
                  child: blog.viewList[widget.index]["mem_profile_img"] != null
                      ? Image.memory(
                    Uint8List.fromList(List<int>.from(
                        blog.viewList[widget.index]["mem_profile_img"]["data"])),
                    width: 50,
                    height: 50,
                  )
                      : Image.asset(
                    'image/User.png',
                    width: 50,
                    height: 50,
                  ),
                ),
                SizedBox(
                  width: 15,
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      blog.viewList[widget.index]["mem_nick"],
                      style: textStyle,
                    ),
                    Text(
                      blog.viewList[widget.index]["created_at"].split("T")[0],
                      style: textStyle,
                    ),
                  ],
                )
              ],
            ),
            SizeBoxH20,
            Text(
              blog.viewList[widget.index]["bd_title"],
              style: textStyle,
            ),
            SizeBoxH30
          ],
        ),
      ),
    );
  }
}