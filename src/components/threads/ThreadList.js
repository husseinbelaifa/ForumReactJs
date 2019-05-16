import React from "react";
import Pagination from "../layout/Pagination";
const ThreadList = props => {
  return (
    <div className="container">
      <div class="col-full push-top">
        <ul class="breadcrumbs">
          <li>
            <a href="/index.html">
              <i class="fa fa-home fa-btn" />
              Home
            </a>
          </li>
          <li>
            <a href="/category.html">{props.category}</a>
          </li>
          <li class="active">
            <a href="#">{props.subCategory}</a>
          </li>
        </ul>
        <div class="forum-header">
          <div class="forum-details">
            <h1>Cooking</h1>
            <p class="text-lead">Discuss your passion for food and cooking</p>
          </div>
          <a href="new-thread.html" class="btn-green btn-small">
            Start a thread
          </a>
        </div>
      </div>
      <div class="col-full">
        <div class="category-item">
          <div class="forum-list">
            <h2 class="list-title">Recipes</h2>

            <div class="forum-listing">
              <div class="forum-details">
                <a href="#" class="forum-name">
                  Recipes
                </a>

                <p class="forum-description ">
                  Recipes, Guides and Tips Tricks
                </p>
              </div>

              <div class="threads-count">
                <p class="count text-lead">1</p> threads
              </div>

              <div class="last-thread">
                <img
                  class="avatar"
                  src="http://cleaneatsfastfeets.com/wp-content/uploads/2013/05/Mr-Burns.gif"
                  alt=""
                />
                <div class="last-thread-details">
                  <a href="#">How I grill my fish</a>
                  <p class="text-xsmall">
                    By <a href="profile.html">Charles Montgomery Burns</a>, 2
                    days ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-full">
        <div class="thread-list">
          <h2 class="list-title">Threads</h2>

          <div class="thread">
            <div>
              <p>
                <a href="thread.html">How can I chop onions without crying?</a>
              </p>
              <p class="text-faded text-xsmall">
                By <a href="profile.html">Joseph Kerr</a>, yesterday.
              </p>
            </div>

            <div class="activity">
              <p class="replies-count">1 reply</p>

              <img
                class="avatar-medium"
                src="http://i0.kym-cdn.com/photos/images/facebook/000/010/934/46623-batman_pikachu_super.png"
                alt=""
              />

              <div>
                <p class="text-xsmall">
                  <a href="profile.html">Bruce Wayne</a>
                </p>
                <p class="text-xsmall text-faded">2 hours ago</p>
              </div>
            </div>
          </div>

          <div class="thread">
            <div>
              <p>
                <a href="thread.html">Wasabi vs horseraddish?</a>
              </p>
              <p class="text-faded text-xsmall">
                By <a href="profile.html">Robin</a>, 8 hours ago
              </p>
            </div>

            <div class="activity">
              <p class="replies-count">3 replies</p>

              <img
                class="avatar-medium"
                src="https://firebasestorage.googleapis.com/v0/b/forum-2a982.appspot.com/o/images%2Favatars%2Fraynathan?alt=media&token=bd9a0f0e-60f2-4e60-b092-77d1ded50a7e"
                alt=""
              />
              <span>
                <a class="text-xsmall" href="profile.html">
                  Ray-Nathan James
                </a>
                <p class="text-faded text-xsmall">3 hours ago</p>
              </span>
            </div>
          </div>

          <div class="thread">
            <div>
              <p>
                <a href="thread.html">Multifilling</a>
              </p>
              <p class="text-faded text-xsmall">
                By <a href="profile.html">Ray-Nathan James</a>, 6 days ago
              </p>
            </div>

            <div class="activity">
              <p class="replies-count">1 reply</p>

              <img
                class="avatar-medium"
                src="http://i0.kym-cdn.com/photos/images/facebook/000/010/934/46623-batman_pikachu_super.png"
                alt=""
              />
              <span>
                <a class="text-xsmall" href="profile.html">
                  Bruce Wayne
                </a>
                <p class="text-faded text-xsmall">6 days ago</p>
              </span>
            </div>
          </div>

          <div class="thread">
            <div>
              <p>
                <a href="thread.html">Egg replacer for bread dough?</a>
              </p>
              <p class="text-faded text-xsmall">
                By <a href="profile.html">Theodor Jackson</a>, 2 weeks ago
              </p>
            </div>

            <div class="activity">
              <p class="replies-count">1 reply</p>

              <img
                class="avatar-medium"
                src="http://icons.iconarchive.com/icons/designbolts/free-male-avatars/128/Male-Avatar-icon.png"
                alt=""
              />
              <span>
                <a class="text-xsmall" href="profile.html">
                  Theodor Jackson
                </a>
                <p class="text-faded text-xsmall">2 weeks ago</p>
              </span>
            </div>
          </div>

          <div class="thread">
            <div>
              <p>
                <a href="thread.html">
                  Which is your favorite carbohydrate? 🤓
                </a>
              </p>
              <p class="text-faded text-xsmall">
                By <a href="profile.html">Ray-Nathan James</a>, 1 month ago
              </p>
            </div>

            <div class="activity">
              <p class="replies-count">0 replies</p>

              <img
                class="avatar-medium"
                src="http://i0.kym-cdn.com/photos/images/facebook/000/010/934/46623-batman_pikachu_super.png"
                alt=""
              />
              <span>
                <a class="text-xsmall" href="profile.html">
                  Ray-Nathan James
                </a>
                <p class="text-faded text-xsmall">1 month ago</p>
              </span>
            </div>
          </div>
        </div>

        <Pagination />
      </div>
    </div>
  );
};

export default ThreadList;
