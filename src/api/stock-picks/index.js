import { axiosApi } from "../../utils/axios";
// Latest Releases Stock List API
export const getLatestReleasesStockListApi = async ({ isLoggedIn, type }) => {
  try {
    // const URL = isLoggedIn
    //   ? `/user/latestRelease`
    //   : `/user/latestRelease/guest`;
    // /* ----------------------------------- API ---------------------------------- */
    // const response = await axiosApi.get(URL, {
    //   params: {
    //     type,
    //   },
    // });
    // return response.data.data;

    /* ----------------------------- Static Data ---------------------------- */
    return [
      {
        upside_left: null,
        stock_tags: [
          {
            id: "5b96c857-65e7-414e-91aa-bfb208fdbae1",
            name: "Turnaround Story",
            image:
              "https://kamayakya.s3.amazonaws.com/strategy-tags/turnaround-story.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2SGK27ISPC7RDHGX%2F20240815%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240815T100834Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=6e8428b5b1450f4e3f7019840480c3078038a2947310d8fd3687fa5439dcda30",
          },
        ],
        sector: "Chemicals",
        stock_target_count: 0,
        id: "fa2bec3e-2312-4974-b8cc-8546c0253103",
        new_stock: true,
        recommended_stock: false,
        is_blur: true,
        upside_left_time: "2 days",
        return_time: "No return time available",
      },
      {
        upside_left: null,
        stock_tags: [
          {
            id: "5b96c857-65e7-414e-91aa-bfb208fdbae1",
            name: "Turnaround Story",
            image:
              "https://kamayakya.s3.amazonaws.com/strategy-tags/turnaround-story.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2SGK27ISPC7RDHGX%2F20240815%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240815T100834Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=6e8428b5b1450f4e3f7019840480c3078038a2947310d8fd3687fa5439dcda30",
          },
        ],
        sector: "Chemicals",
        stock_target_count: 0,
        id: "36027015-2c7d-4b3d-a287-a14a0a4b510c",
        new_stock: true,
        recommended_stock: false,
        is_blur: true,
        upside_left_time: "2 days",
        return_time: "No return time available",
      },
      {
        upside_left: null,
        stock_tags: [
          {
            id: "8241c0f4-d726-4ab5-8089-58c7fcf0980e",
            name: "Special Situation",
            image:
              "https://kamayakya.s3.amazonaws.com/strategy-tags/special-situation.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2SGK27ISPC7RDHGX%2F20240815%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240815T100834Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=aee12d4ad44a0b241068433de011f0999ecee26d44fa78f0e4c06926fa8ec2d9",
          },
          {
            id: "6d9fb7a0-92b3-4633-8ea9-ae86dc2bd008",
            name: "Management Change",
            image:
              "https://kamayakya.s3.amazonaws.com/strategy-tags/management-change.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2SGK27ISPC7RDHGX%2F20240815%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240815T100834Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=1d2690b88d14356424608c6977057ee7693a6bd32e02c3cc9b01a20b281d52c1",
          },
        ],
        sector: "FMCG",
        stock_target_count: 0,
        id: "9e97efcb-fe26-451d-8252-b10ce15de78e",
        new_stock: true,
        recommended_stock: false,
        is_blur: true,
        upside_left_time: "2 days",
        return_time: "No return time available",
      },
      {
        upside_left: null,
        stock_tags: [
          {
            id: "178b2792-26c7-4f97-b763-bb62541f5c8e",
            name: "Value Pick",
            image:
              "https://kamayakya.s3.amazonaws.com/strategy-tags/value-pick.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2SGK27ISPC7RDHGX%2F20240815%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240815T100834Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=557c0fb423fce417649e7596ebe8b940e2528900d95bea8bee8c0c478fa586ac",
          },
        ],
        sector: "FMCG",
        stock_target_count: 0,
        id: "e9d86d54-7ebb-4aee-979e-e19f40722fd6",
        new_stock: true,
        recommended_stock: false,
        is_blur: true,
        upside_left_time: "2 days",
        return_time: "No return time available",
      },
      {
        upside_left: null,
        stock_tags: [
          {
            id: "5b96c857-65e7-414e-91aa-bfb208fdbae1",
            name: "Turnaround Story",
            image:
              "https://kamayakya.s3.amazonaws.com/strategy-tags/turnaround-story.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2SGK27ISPC7RDHGX%2F20240815%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240815T100834Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=6e8428b5b1450f4e3f7019840480c3078038a2947310d8fd3687fa5439dcda30",
          },
        ],
        sector: "Chemicals",
        stock_target_count: 0,
        id: "fc57933e-3763-47d4-835e-6b269ce0220c",
        new_stock: true,
        recommended_stock: false,
        is_blur: true,
        upside_left_time: "2 days",
        return_time: "No return time available",
      },
      {
        upside_left: null,
        stock_tags: [
          {
            id: "8241c0f4-d726-4ab5-8089-58c7fcf0980e",
            name: "Special Situation",
            image:
              "https://kamayakya.s3.amazonaws.com/strategy-tags/special-situation.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2SGK27ISPC7RDHGX%2F20240815%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240815T100834Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=aee12d4ad44a0b241068433de011f0999ecee26d44fa78f0e4c06926fa8ec2d9",
          },
        ],
        sector: "Chemicals",
        stock_target_count: 0,
        id: "fa6623a0-c04a-4016-b794-1f997b73f6ad",
        new_stock: true,
        recommended_stock: false,
        is_blur: true,
        upside_left_time: "2 days",
        return_time: "No return time available",
      },
      {
        upside_left: null,
        stock_tags: [
          {
            id: "178b2792-26c7-4f97-b763-bb62541f5c8e",
            name: "Value Pick",
            image:
              "https://kamayakya.s3.amazonaws.com/strategy-tags/value-pick.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2SGK27ISPC7RDHGX%2F20240815%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240815T100834Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=557c0fb423fce417649e7596ebe8b940e2528900d95bea8bee8c0c478fa586ac",
          },
        ],
        sector: "FMCG",
        stock_target_count: 0,
        id: "e8fbbac8-5106-4d7b-b321-d923ceb1779c",
        new_stock: true,
        recommended_stock: false,
        is_blur: true,
        upside_left_time: "2 days",
        return_time: "No return time available",
      },
      {
        upside_left: null,
        stock_tags: [
          {
            id: "178b2792-26c7-4f97-b763-bb62541f5c8e",
            name: "Value Pick",
            image:
              "https://kamayakya.s3.amazonaws.com/strategy-tags/value-pick.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2SGK27ISPC7RDHGX%2F20240815%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240815T100834Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=557c0fb423fce417649e7596ebe8b940e2528900d95bea8bee8c0c478fa586ac",
          },
          {
            id: "8241c0f4-d726-4ab5-8089-58c7fcf0980e",
            name: "Special Situation",
            image:
              "https://kamayakya.s3.amazonaws.com/strategy-tags/special-situation.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2SGK27ISPC7RDHGX%2F20240815%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240815T100834Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=aee12d4ad44a0b241068433de011f0999ecee26d44fa78f0e4c06926fa8ec2d9",
          },
        ],
        sector: "Chemicals",
        stock_target_count: 0,
        id: "e52a274e-1a2d-4332-a050-fdc7cc42475c",
        new_stock: true,
        recommended_stock: false,
        is_blur: true,
        upside_left_time: "2 days",
        return_time: "No return time available",
      },
      {
        upside_left: 11.1,
        stock_tags: [
          {
            id: "5b96c857-65e7-414e-91aa-bfb208fdbae1",
            name: "Turnaround Story",
            image:
              "https://kamayakya.s3.amazonaws.com/strategy-tags/turnaround-story.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2SGK27ISPC7RDHGX%2F20240815%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240815T100834Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=6e8428b5b1450f4e3f7019840480c3078038a2947310d8fd3687fa5439dcda30",
          },
          {
            id: "8241c0f4-d726-4ab5-8089-58c7fcf0980e",
            name: "Special Situation",
            image:
              "https://kamayakya.s3.amazonaws.com/strategy-tags/special-situation.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2SGK27ISPC7RDHGX%2F20240815%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240815T100834Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=aee12d4ad44a0b241068433de011f0999ecee26d44fa78f0e4c06926fa8ec2d9",
          },
          {
            id: "6d9fb7a0-92b3-4633-8ea9-ae86dc2bd008",
            name: "Management Change",
            image:
              "https://kamayakya.s3.amazonaws.com/strategy-tags/management-change.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2SGK27ISPC7RDHGX%2F20240815%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240815T100834Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=1d2690b88d14356424608c6977057ee7693a6bd32e02c3cc9b01a20b281d52c1",
          },
        ],
        sector: "IT",
        stock_target_count: 3,
        id: "e72fa69d-4850-4516-a592-04342586d6a8",
        new_stock: true,
        recommended_stock: false,
        is_blur: true,
        upside_left_time: "9 days",
        return_time: "5 months",
      },
      {
        upside_left: 11.1,
        stock_tags: [
          {
            id: "5b96c857-65e7-414e-91aa-bfb208fdbae1",
            name: "Turnaround Story",
            image:
              "https://kamayakya.s3.amazonaws.com/strategy-tags/turnaround-story.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2SGK27ISPC7RDHGX%2F20240815%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240815T100834Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=6e8428b5b1450f4e3f7019840480c3078038a2947310d8fd3687fa5439dcda30",
          },
          {
            id: "8241c0f4-d726-4ab5-8089-58c7fcf0980e",
            name: "Special Situation",
            image:
              "https://kamayakya.s3.amazonaws.com/strategy-tags/special-situation.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2SGK27ISPC7RDHGX%2F20240815%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240815T100834Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=aee12d4ad44a0b241068433de011f0999ecee26d44fa78f0e4c06926fa8ec2d9",
          },
        ],
        sector: "IT",
        stock_target_count: 3,
        id: "92326e51-f74f-411a-8c96-e3a1382a2b65",
        new_stock: true,
        recommended_stock: true,
        is_blur: true,
        upside_left_time: "9 days",
        return_time: "5 months",
      },
      {
        upside_left: 20.25,
        stock_tags: [
          {
            id: "178b2792-26c7-4f97-b763-bb62541f5c8e",
            name: "Value Pick",
            image:
              "https://kamayakya.s3.amazonaws.com/strategy-tags/value-pick.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2SGK27ISPC7RDHGX%2F20240815%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240815T100834Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=557c0fb423fce417649e7596ebe8b940e2528900d95bea8bee8c0c478fa586ac",
          },
          {
            id: "5b96c857-65e7-414e-91aa-bfb208fdbae1",
            name: "Turnaround Story",
            image:
              "https://kamayakya.s3.amazonaws.com/strategy-tags/turnaround-story.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2SGK27ISPC7RDHGX%2F20240815%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240815T100834Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=6e8428b5b1450f4e3f7019840480c3078038a2947310d8fd3687fa5439dcda30",
          },
          {
            id: "8241c0f4-d726-4ab5-8089-58c7fcf0980e",
            name: "Special Situation",
            image:
              "https://kamayakya.s3.amazonaws.com/strategy-tags/special-situation.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2SGK27ISPC7RDHGX%2F20240815%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240815T100834Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=aee12d4ad44a0b241068433de011f0999ecee26d44fa78f0e4c06926fa8ec2d9",
          },
        ],
        sector: "IT",
        stock_target_count: 2,
        id: "b55d775c-52b5-43b9-b83e-fe530d577b36",
        new_stock: true,
        recommended_stock: true,
        is_blur: true,
        upside_left_time: "9 days",
        return_time: "3 months",
      },
      {
        upside_left: null,
        stock_tags: [
          {
            id: "5b96c857-65e7-414e-91aa-bfb208fdbae1",
            name: "Turnaround Story",
            image:
              "https://kamayakya.s3.amazonaws.com/strategy-tags/turnaround-story.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2SGK27ISPC7RDHGX%2F20240815%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240815T100834Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=6e8428b5b1450f4e3f7019840480c3078038a2947310d8fd3687fa5439dcda30",
          },
          {
            id: "a282f6c5-0c47-451c-8d41-fd2888c7737b",
            name: "Cyclicals",
            image:
              "https://kamayakya.s3.amazonaws.com/strategy-tags/cyclicals.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2SGK27ISPC7RDHGX%2F20240815%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240815T100834Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=e56552582f3447e87b76e06a397ef12e6f6e152d6a696dc68436260aeb0d8a78",
          },
          {
            id: "43a146f9-2f69-40ba-ad48-1faba29db0a5",
            name: "Moated",
            image:
              "https://kamayakya.s3.amazonaws.com/strategy-tags/moated.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2SGK27ISPC7RDHGX%2F20240815%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240815T100834Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=308ca6c315cebeaa8dea624771ef436767dac9383d61b35573f2f4726f782447",
          },
        ],
        sector: "FMCG",
        stock_target_count: 2,
        id: "1208bb79-076b-4b09-92e3-7c4bdc597835",
        new_stock: true,
        recommended_stock: false,
        is_blur: true,
        upside_left_time: "9 days",
        return_time: "No return time available",
      },
      {
        upside_left: 19.73,
        stock_tags: [
          {
            id: "178b2792-26c7-4f97-b763-bb62541f5c8e",
            name: "Value Pick",
            image:
              "https://kamayakya.s3.amazonaws.com/strategy-tags/value-pick.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2SGK27ISPC7RDHGX%2F20240815%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240815T100834Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=557c0fb423fce417649e7596ebe8b940e2528900d95bea8bee8c0c478fa586ac",
          },
          {
            id: "124d8a4f-bcf5-4693-a351-23ee591f48db",
            name: "ESG",
            image:
              "https://kamayakya.s3.amazonaws.com/strategy-tags/esg.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2SGK27ISPC7RDHGX%2F20240815%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240815T100834Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=9824c9a1a66b81aab453ccab60e2d270d67fd11514989c8ff698aecdb721a3fe",
          },
        ],
        sector: "Chemicals",
        stock_target_count: 2,
        id: "a15edf01-e950-403f-894b-8cf26dc9346e",
        new_stock: true,
        recommended_stock: true,
        is_blur: true,
        upside_left_time: "9 days",
        return_time: "-194 days",
      },
      {
        upside_left: 19.73,
        stock_tags: [
          {
            id: "178b2792-26c7-4f97-b763-bb62541f5c8e",
            name: "Value Pick",
            image:
              "https://kamayakya.s3.amazonaws.com/strategy-tags/value-pick.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2SGK27ISPC7RDHGX%2F20240815%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240815T100834Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=557c0fb423fce417649e7596ebe8b940e2528900d95bea8bee8c0c478fa586ac",
          },
          {
            id: "124d8a4f-bcf5-4693-a351-23ee591f48db",
            name: "ESG",
            image:
              "https://kamayakya.s3.amazonaws.com/strategy-tags/esg.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2SGK27ISPC7RDHGX%2F20240815%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240815T100834Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=9824c9a1a66b81aab453ccab60e2d270d67fd11514989c8ff698aecdb721a3fe",
          },
        ],
        sector: "IT",
        stock_target_count: 2,
        id: "d4da1aab-0c22-49f7-b233-2bcd269f9dfc",
        new_stock: true,
        recommended_stock: true,
        is_blur: true,
        upside_left_time: "9 days",
        return_time: "-194 days",
      },
      {
        upside_left: 200,
        stock_tags: [
          {
            id: "ac7148dc-e122-48a8-9efb-51a02c87f518",
            name: "Market Leadership",
            image:
              "https://kamayakya.s3.amazonaws.com/strategy-tags/market-leadership.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2SGK27ISPC7RDHGX%2F20240815%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240815T100834Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=6e9c5965cf82c7d1e4fede679e395e8781cc4e0c30b78123d6c66c50b29bcaf0",
          },
          {
            id: "18ab2bd3-6895-420f-8259-6132597cdff4",
            name: "Future Focused",
            image:
              "https://kamayakya.s3.amazonaws.com/strategy-tags/future-focused.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2SGK27ISPC7RDHGX%2F20240815%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240815T100834Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=1a1ef1cb612f051043dd4766b769c564f7ffdee23f96786ee8aa1c5944ad997c",
          },
          {
            id: "124d8a4f-bcf5-4693-a351-23ee591f48db",
            name: "ESG",
            image:
              "https://kamayakya.s3.amazonaws.com/strategy-tags/esg.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2SGK27ISPC7RDHGX%2F20240815%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240815T100834Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=9824c9a1a66b81aab453ccab60e2d270d67fd11514989c8ff698aecdb721a3fe",
          },
        ],
        sector: "Chemicals",
        stock_target_count: 4,
        id: "2a4714ca-9a92-4267-8a51-2d6cc60e3ce1",
        new_stock: true,
        recommended_stock: false,
        is_blur: true,
        upside_left_time: "9 days",
        return_time: "2 days",
      },
    ];
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
};

// Strategy Tags API
export const getStrategyTagListApi = async () => {
  try {
    /* ----------------------------------- API ---------------------------------- */
    // const response = await axiosApi.get(`/user/strategyTags/`);
    // return response.data.data;

    /* ----------------------------- Static Data ---------------------------- */
    return [
      {
        name: "Value Pick",
        slug: "value-pick",
        image: "/assets/discover-by-strategy/value-pick.svg",
        description: "Discover undervalued gems with strong fundamentals.",
      },
      {
        name: "Turnaround Story",
        slug: "turnaround-story",
        image: "/assets/discover-by-strategy/turnaround-story.svg",
        description: "Invest in companies poised for a comeback.",
      },
      {
        name: "Special Situation",
        slug: "special-situation",
        image: "/assets/discover-by-strategy/special-situation.svg",
        description:
          "Unique opportunities arising from corporate events or restructuring.",
      },
      {
        name: "Management Change",
        slug: "management-change",
        image: "/assets/discover-by-strategy/management-change.svg",
        description: "Benefit from new leadership and strategic direction.",
      },
      {
        name: "Market Leadership",
        slug: "market-leadership",
        image: "/assets/discover-by-strategy/market-leadership.svg",
        description:
          "Invest in industry leaders with a strong market position.",
      },
      {
        name: "Industry Tailwind",
        slug: "industry-tailwind",
        image: "/assets/discover-by-strategy/industry-tailwind.svg",
        description:
          "Sectors with favorable economic conditions driving growth.",
      },
      {
        name: "Cyclicals",
        slug: "moated",
        image: "/assets/discover-by-strategy/cyclicals.svg",
        description: "Invest in industries that benefit from economic cycles.",
      },
      {
        name: "Moated",
        slug: "cyclicals",
        image: "/assets/discover-by-strategy/moated.svg",
        description:
          "Firms with strong competitive advantages that protect their market position.",
      },

      {
        name: "Thematic Stories",
        slug: "thematic-stories",
        image: "/assets/discover-by-strategy/thematic-stories.svg",
        description: "Align investments with emerging trends and themes.",
      },
      {
        name: "Future Focused",
        slug: "future-focused",
        image: "/assets/discover-by-strategy/future-focused.svg",
        description: "Companies with a strong vision for long-term growth.",
      },
      {
        name: "ESG",
        slug: "esg",
        image: "/assets/discover-by-strategy/esg.svg",
        description:
          "Invest in companies with strong Environmental, Social, and Governance practices.",
      },
      {
        name: "High Dividends",
        slug: "high-dividends",
        image: "/assets/discover-by-strategy/high-dividends.svg",
        description:
          "Companies offering attractive and consistent dividend yields.",
      },
    ];
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
};
