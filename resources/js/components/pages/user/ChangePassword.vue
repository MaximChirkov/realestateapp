<template>
    <div class="page-head">
        <div class="container">
            <div class="row">
                <div class="page-head-content">
                    <h1 class="page-title">Hello : <span class="orange strong">Kimaro kyoto</span></h1>
                </div>
            </div>
        </div>
    </div>

    <div class="content-area user-profiel" style="background-color: #FCFCFC;">&nbsp;
        <div class="container">
            <div class="row">
                <div class="col-sm-10 col-sm-offset-1 profiel-container">

                    <form action="#" method="post">

                        <div class="profiel-header">
                            <h3>
                                <b>UPDATE</b> YOUR PASSWORD <br>
                            </h3>
                            <hr>
                        </div>

                        <div class="clear">

                            <div class="col-sm-10 col-sm-offset-1">
                                <div class="form-group">
                                    <label>Password <small>(required)</small></label>
                                    <input type="password" name="Password" class="form-control" />
                                </div>
                                <div class="form-group">
                                    <label>Confirm password : <small>(required)</small></label>
                                    <input type="password" name="password_confirmation" class="form-control" />
                                </div>
                            </div>
                            <div class="col-sm-10 col-sm-offset-1 text-center">
                                <input type='submit' class='btn btn-finish btn-primary' name='update' value='Update' />
                            </div>

                        </div>

                    </form>

                </div>
            </div><!-- end row -->

        </div>
    </div>
</template>

<script>
export default {
    name: "ChangePassword"
}
</script>
