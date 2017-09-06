import { type } from '../shared/ngrx/type';
export var RelatedItemActionTypes = {
    RELATED_COLLECTIONS: type('[Related] Find Related Collections'),
    RELATED_COLLECTIONS_SUCCESS: type('[Related] Related Collections'),
    CLEAR_RELATED_COLLECTIONS: type('[Related] Clear Related Collections'),
    REQUEST_FAILED: type('[Related] Request Failed'),
};
var ItemActionRelated = (function () {
    function ItemActionRelated(id, subjectIds) {
        this.type = RelatedItemActionTypes.RELATED_COLLECTIONS;
        this.payload = {
            id: id,
            subjectIds: subjectIds
        };
    }
    return ItemActionRelated;
}());
export { ItemActionRelated };
var ItemActionRelatedSuccess = (function () {
    function ItemActionRelatedSuccess(payload) {
        this.payload = payload;
        this.type = RelatedItemActionTypes.RELATED_COLLECTIONS_SUCCESS;
    }
    return ItemActionRelatedSuccess;
}());
export { ItemActionRelatedSuccess };
var ClearRelatedItems = (function () {
    function ClearRelatedItems() {
        this.type = RelatedItemActionTypes.CLEAR_RELATED_COLLECTIONS;
    }
    return ClearRelatedItems;
}());
export { ClearRelatedItems };
var RelatedItemRequestFailed = (function () {
    function RelatedItemRequestFailed(err) {
        this.type = RelatedItemActionTypes.REQUEST_FAILED;
        console.log(err);
    }
    return RelatedItemRequestFailed;
}());
export { RelatedItemRequestFailed };
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/actions/related.actions.js.map