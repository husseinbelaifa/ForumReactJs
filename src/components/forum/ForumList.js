import React from "react";
import Category from "../categories/Category";
import SubCategory from "../categories/SubCategory";
import ThreadCount from "../threads/ThreadCount";

import LastThread from "../threads/LastThread";

const ForumList = () => {
  return (
    <div class="container">
      <div class="col-full">
        <div class="forum-list">
          <Category category="FeedbackInformation" />
          <div class="forum-listing">
            <SubCategory
              subcategory="Announcements"
              infosubcategory="Important announcements about the forum."
            />

            <ThreadCount ThreadCount="1" />
            <LastThread
              threadTitle="Post Reactions"
              threadAuthorAvatar="https://firebasestorage.googleapis.com/v0/b/forum-2a982.appspot.com/o/images%2Favatars%2Frah?alt=media&token=7ad21914-a4f4-4ad0-add6-17e6d3ae9679"
              threadAuthor="Rolf Haug"
              threadTime="a month ago"
            />
          </div>{" "}
          <div class="forum-listing">
            <SubCategory
              subcategory="Announcements"
              infosubcategory="Important announcements about the forum."
              subsOfSubCategory="Recipes"
            />

            <ThreadCount ThreadCount="1" />
            <LastThread
              threadTitle="Post Reactions"
              threadAuthorAvatar="https://firebasestorage.googleapis.com/v0/b/forum-2a982.appspot.com/o/images%2Favatars%2Frah?alt=media&token=7ad21914-a4f4-4ad0-add6-17e6d3ae9679"
              threadAuthor="Rolf Haug"
              threadTime="a month ago"
            />
          </div>{" "}
          <div class="forum-listing">
            <SubCategory
              subcategory="Announcements"
              infosubcategory="Important announcements about the forum."
            />

            <ThreadCount ThreadCount="1" />
            <LastThread
              threadTitle="Post Reactions"
              threadAuthorAvatar="https://firebasestorage.googleapis.com/v0/b/forum-2a982.appspot.com/o/images%2Favatars%2Frah?alt=media&token=7ad21914-a4f4-4ad0-add6-17e6d3ae9679"
              threadAuthor="Rolf Haug"
              threadTime="a month ago"
            />
          </div>{" "}
        </div>{" "}
        <div class="forum-list">
          <Category category="FeedbackInformation" />
          <div class="forum-listing">
            <SubCategory
              subcategory="Announcements"
              infosubcategory="Important announcements about the forum."
            />

            <ThreadCount ThreadCount="1" />
            <LastThread
              threadTitle="Post Reactions"
              threadAuthorAvatar="https://firebasestorage.googleapis.com/v0/b/forum-2a982.appspot.com/o/images%2Favatars%2Frah?alt=media&token=7ad21914-a4f4-4ad0-add6-17e6d3ae9679"
              threadAuthor="Rolf Haug"
              threadTime="a month ago"
            />
          </div>{" "}
          <div class="forum-listing">
            <SubCategory
              subcategory="Announcements"
              infosubcategory="Important announcements about the forum."
            />

            <ThreadCount ThreadCount="1" />
            <LastThread
              threadTitle="Post Reactions"
              threadAuthorAvatar="https://firebasestorage.googleapis.com/v0/b/forum-2a982.appspot.com/o/images%2Favatars%2Frah?alt=media&token=7ad21914-a4f4-4ad0-add6-17e6d3ae9679"
              threadAuthor="Rolf Haug"
              threadTime="a month ago"
            />
          </div>{" "}
          <div class="forum-listing">
            <SubCategory
              subcategory="Announcements"
              infosubcategory="Important announcements about the forum."
            />

            <ThreadCount ThreadCount="1" />
            <LastThread
              threadTitle="Post Reactions"
              threadAuthorAvatar="https://firebasestorage.googleapis.com/v0/b/forum-2a982.appspot.com/o/images%2Favatars%2Frah?alt=media&token=7ad21914-a4f4-4ad0-add6-17e6d3ae9679"
              threadAuthor="Rolf Haug"
              threadTime="a month ago"
            />
          </div>{" "}
        </div>{" "}
        <div class="forum-list">
          <Category category="FeedbackInformation" />
          <div class="forum-listing">
            <SubCategory
              subcategory="Announcements"
              infosubcategory="Important announcements about the forum."
            />

            <ThreadCount ThreadCount="1" />
            <LastThread
              threadTitle="Post Reactions"
              threadAuthorAvatar="https://firebasestorage.googleapis.com/v0/b/forum-2a982.appspot.com/o/images%2Favatars%2Frah?alt=media&token=7ad21914-a4f4-4ad0-add6-17e6d3ae9679"
              threadAuthor="Rolf Haug"
              threadTime="a month ago"
            />
          </div>{" "}
          <div class="forum-listing">
            <SubCategory
              subcategory="Announcements"
              infosubcategory="Important announcements about the forum."
            />

            <ThreadCount ThreadCount="1" />
            <LastThread
              threadTitle="Post Reactions"
              threadAuthorAvatar="https://firebasestorage.googleapis.com/v0/b/forum-2a982.appspot.com/o/images%2Favatars%2Frah?alt=media&token=7ad21914-a4f4-4ad0-add6-17e6d3ae9679"
              threadAuthor="Rolf Haug"
              threadTime="a month ago"
            />
          </div>{" "}
          <div class="forum-listing">
            <SubCategory
              subcategory="Announcements"
              infosubcategory="Important announcements about the forum."
            />

            <ThreadCount ThreadCount="1" />
            <LastThread
              threadTitle="Post Reactions"
              threadAuthorAvatar="https://firebasestorage.googleapis.com/v0/b/forum-2a982.appspot.com/o/images%2Favatars%2Frah?alt=media&token=7ad21914-a4f4-4ad0-add6-17e6d3ae9679"
              threadAuthor="Rolf Haug"
              threadTime="a month ago"
            />
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default ForumList;
