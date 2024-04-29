// import { mount } from "@vue/test-utils";
// import ArticleDetails from "@/components/Sections/ArticleDetails.vue";

// describe("ArticleDetails", () => {
//   it("fetches article details and renders correctly", async () => {
//     const articleId = "1"; 
//     const mockArticle = {
//       id: "1",
//       title: "Mock Article",
//       content: "Lorem ipsum dolor sit amet",
//       category: "Mock Category",
//       createdBy: "Mock Author",
//       tags: ["Tag1", "Tag2", "Tag3"],
//       image: "mock-image.jpg",
//     };
//     const mockApiResponse = {
//       data: {
//         article: mockArticle,
//       },
//     };
//     const mockApi = {
//       get: jest.fn().mockResolvedValue(mockApiResponse),
//     };
//     const wrapper = mount(ArticleDetails, {
//       data() {
//         return {
//           article: mockArticle, 
//           d_loading: false, 
//         };
//       },
//       mocks: {
//         $route: {
//           params: {
//             id: articleId,
//           },
//         },
//         api: mockApi,
//       },
//     });

//     await wrapper.vm.fetchArticleById(articleId);

//     expect(wrapper.find(".article-title").text()).toBe(mockArticle.title);
//     expect(wrapper.find(".article-content").text()).toBe(mockArticle.content);
//     expect(wrapper.find(".article-category").text()).toBe(mockArticle.category);
//     expect(wrapper.find(".article-author").text()).toBe(mockArticle.createdBy);
//     expect(wrapper.findAll(".article-tag").length).toBe(
//       mockArticle.tags.length
//     );
//     expect(wrapper.find(".article-image").attributes("src")).toBe(
//       mockArticle.image
//     );
//   });
// });
